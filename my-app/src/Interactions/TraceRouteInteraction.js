import React, { useContext, useEffect, useState } from "react";
import {DragBox, Select} from 'ol/interaction';
import MapContext from "../Map/MapContext";
import * as ol from 'ol';
import { always, shiftKeyOnly, platformModifierKeyOnly } from 'ol/events/condition'
import './DragBoxInteraction.css';
import axios from 'axios';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style';
import {Draw, Modify, Snap} from 'ol/interaction';
import {OSM, Vector as VectorSource} from 'ol/source';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import {unByKey} from 'ol/Observable';
import Overlay from 'ol/Overlay';
import {LineString, Polygon} from 'ol/geom';

const TraceRouteInteraction = ( { active } ) => {
  const { map } = useContext(MapContext);

  var source = new VectorSource();
  var vector = new VectorLayer({
    source: source,
    style: new Style({
      fill: new Fill({
        color: 'rgba(255, 255, 255, 0.2)',
      }),
      stroke: new Stroke({
        color: '#ffcc33',
        width: 2,
      }),
      image: new CircleStyle({
        radius: 7,
        fill: new Fill({
          color: '#ffcc33',
        }),
      }),
    }),
  });

  var sketch;
  var helpTooltipElement;
  var helpTooltip;
  var measureTooltipElement;
  var measureTooltip;
  var continuePolygonMsg = 'Click to continue drawing the polygon';
  var continueLineMsg = 'Doble Click para finalizar trazado de ruta';
  var draw, snap;
  var modify = new Modify({source: source});


  var pointerMoveHandler = function (evt) {
    if (evt.dragging) {
      return;
    }
    var helpMsg = 'Click para empezar a trazar ruta';
  
    if (sketch) {
      var geom = sketch.getGeometry();
      if (geom instanceof LineString) {
        helpMsg = continueLineMsg;
      } 
    }
  
    helpTooltipElement.innerHTML = helpMsg;
    helpTooltip.setPosition(evt.coordinate);
  
    helpTooltipElement.classList.remove('hidden');
  };

  function addInteraction() {
    
    var type = 'LineString';
    draw = new Draw({
      source: source,
      type: type
    });
    map.addInteraction(draw);
    snap = new Snap({source: source});
    map.addInteraction(snap);
  
    createMeasureTooltip();
    createHelpTooltip();
  
    var listener;
    draw.on('drawstart', function (evt) {
      // set sketch
      sketch = evt.feature;
  
      /** @type {import("../src/ol/coordinate.js").Coordinate|undefined} */
      var tooltipCoord = evt.coordinate;
  
    });
  
    draw.on('drawend', function () {
      measureTooltipElement.className = 'ol-tooltip ol-tooltip-static';
      measureTooltip.setOffset([0, -7]);
      // unset sketch
      sketch = null;
      // unset tooltip so that a new one can be created
      measureTooltipElement = null;
      createMeasureTooltip();
      unByKey(listener);
    });
  }


  function createHelpTooltip() {
    if (helpTooltipElement) {
      helpTooltipElement.parentNode.removeChild(helpTooltipElement);
    }
    helpTooltipElement = document.createElement('div');
    helpTooltipElement.className = 'ol-tooltip hidden';
    helpTooltipElement.id = 'initial-tooltip';
    helpTooltip = new Overlay({
      element: helpTooltipElement,
      offset: [15, 0],
      positioning: 'center-left',
    });
    map.addOverlay(helpTooltip);
  }

  /**
   * Creates a new measure tooltip
   */
  function createMeasureTooltip() {
    if (measureTooltipElement) {
      measureTooltipElement.parentNode.removeChild(measureTooltipElement);
    }
    measureTooltipElement = document.createElement('div');
    measureTooltipElement.className = 'ol-tooltip ol-tooltip-measure';
    measureTooltip = new Overlay({
      element: measureTooltipElement,
      offset: [0, -15],
      positioning: 'bottom-center',
    });
    map.addOverlay(measureTooltip);
  }



	useEffect(() => {
		if (!map) return;

		if (active) {
      map.addLayer(vector);
      map.on('pointermove', pointerMoveHandler);
      map.getViewport().addEventListener('mouseout', function () {
        helpTooltipElement.classList.add('hidden');
      });

      addInteraction();
      map.addInteraction(modify);
		} else {
      map.removeLayer(vector);
      map.removeInteraction(modify);
			map.removeInteraction(draw);
      map.removeInteraction(snap);
		}

		return () => {
      map.removeLayer(vector);
      let initialTooltip =  document.getElementById("initial-tooltip");
      if (initialTooltip) {
        initialTooltip.parentNode.removeChild(initialTooltip);
      }
      map.removeInteraction(modify);
      map.removeInteraction(draw);
      map.removeInteraction(snap);
    };
	}, [map, active]);

	return null;
};

export default TraceRouteInteraction;