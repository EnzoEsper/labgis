import 'ol/ol.css';
import Map from 'ol/Map';
import Overlay from 'ol/Overlay';
import View from 'ol/View';
import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style';
import {LineString, Polygon} from 'ol/geom';
import {OSM, Vector as VectorSource} from 'ol/source';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import {getArea, getLength} from 'ol/sphere';
import {unByKey} from 'ol/Observable';
import React, { useContext, useEffect, useState } from "react";
import {DragBox, Select} from 'ol/interaction';
import MapContext from "../Map/MapContext";
import * as ol from 'ol';
import 'ol/ol.css';
import {Draw, Modify, Snap} from 'ol/interaction';

const MeasureInteraction = ( { active } ) => {
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
  var continueLineMsg = 'Doble click para finalizar medida';
  var draw;

  var pointerMoveHandler = function (evt) {
    if (evt.dragging) {
      return;
    }
    /** @type {string} */
    var helpMsg = 'Click para empezar a medir';
  
    if (sketch) {
      var geom = sketch.getGeometry();
      if (geom instanceof Polygon) {
        helpMsg = continuePolygonMsg;
      } else if (geom instanceof LineString) {
        helpMsg = continueLineMsg;
      }
    }
  
    helpTooltipElement.innerHTML = helpMsg;
    helpTooltip.setPosition(evt.coordinate);
  
    helpTooltipElement.classList.remove('hidden');
  };

  var formatLength = function (line) {
    var length = getLength(line);
    var output;
    if (length > 100) {
      output = Math.round((length / 1000) * 100) / 100 + ' ' + 'km';
    } else {
      output = Math.round(length * 100) / 100 + ' ' + 'm';
    }
    return output;
  };

  var formatArea = function (polygon) {
    var area = getArea(polygon);
    var output;
    if (area > 10000) {
      output = Math.round((area / 1000000) * 100) / 100 + ' ' + 'km<sup>2</sup>';
    } else {
      output = Math.round(area * 100) / 100 + ' ' + 'm<sup>2</sup>';
    }
    return output;
  };

  function addInteraction() {
    var type = 'LineString';
    draw = new Draw({
      source: source,
      type: type,
      style: new Style({
        fill: new Fill({
          color: 'rgba(255, 255, 255, 0.2)',
        }),
        stroke: new Stroke({
          color: 'rgba(0, 0, 0, 0.5)',
          lineDash: [10, 10],
          width: 2,
        }),
        image: new CircleStyle({
          radius: 5,
          stroke: new Stroke({
            color: 'rgba(0, 0, 0, 0.7)',
          }),
          fill: new Fill({
            color: 'rgba(255, 255, 255, 0.2)',
          }),
        }),
      }),
    });
    map.addInteraction(draw);
  
    createMeasureTooltip();
    createHelpTooltip();
  
    var listener;
    draw.on('drawstart', function (evt) {
      // set sketch
      sketch = evt.feature;
  
      /** @type {import("../src/ol/coordinate.js").Coordinate|undefined} */
      var tooltipCoord = evt.coordinate;
  
      listener = sketch.getGeometry().on('change', function (evt) {
        var geom = evt.target;
        var output;
        // if (geom instanceof Polygon) {
        //   output = formatArea(geom);
        //   tooltipCoord = geom.getInteriorPoint().getCoordinates();
        // } else if (geom instanceof LineString) {
        //   output = formatLength(geom);
        //   tooltipCoord = geom.getLastCoordinate();
        // }

        output = formatLength(geom);
        tooltipCoord = geom.getLastCoordinate();

        measureTooltipElement.innerHTML = output;
        measureTooltip.setPosition(tooltipCoord);
      });
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

  /**
   * Creates a new help tooltip
   */
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

  // function to remove all tooltips when a meassure is made and the user change to another interaction
  function removeElementsByClass(className){
    var elements = document.getElementsByClassName(className);
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
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
		} else {
      map.removeLayer(vector);
      
      // tooltips with measures results are removed
      removeElementsByClass("ol-tooltip ol-tooltip-static");
      map.removeInteraction(draw);
		}

		return () => {
      map.removeLayer(vector);

      // removes the initial tooltip when the user changes the interaction
      let initialTooltip =  document.getElementById("initial-tooltip");
      if (initialTooltip) {
        initialTooltip.parentNode.removeChild(initialTooltip);
      }
      
      map.removeInteraction(draw);
    };
  }, [map, active]);
  
  return null;
};

export default MeasureInteraction;































// import React, { useContext, useEffect, useState } from "react";
// import MapContext from "../Map/MapContext";
// import 'ol/ol.css';
// import Draw from 'ol/interaction/Draw';
// import Map from 'ol/Map';
// import Overlay from 'ol/Overlay';
// import View from 'ol/View';
// import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style';
// import {LineString, Polygon} from 'ol/geom';
// import {OSM, Vector as VectorSource} from 'ol/source';
// import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
// import {getArea, getLength} from 'ol/sphere';
// import {unByKey} from 'ol/Observable';

// const MeasureInteraction = ( { active } ) => {
//   const { map } = useContext(MapContext);
  
//   var source = new VectorSource();

//   var sketch;
//   var helpTooltipElement;
//   var helpTooltip;
//   var measureTooltipElement;
//   var measureTooltip;
//   var draw;


//   var formatLength = function (line) {
//     var length = getLength(line);
//     var output;
//     if (length > 100) {
//       output = Math.round((length / 1000) * 100) / 100 + ' ' + 'km';
//     } else {
//       output = Math.round(length * 100) / 100 + ' ' + 'm';
//     }
//     return output;
//   };

//   var formatArea = function (polygon) {
//     var area = getArea(polygon);
//     var output;
//     if (area > 10000) {
//       output = Math.round((area / 1000000) * 100) / 100 + ' ' + 'km<sup>2</sup>';
//     } else {
//       output = Math.round(area * 100) / 100 + ' ' + 'm<sup>2</sup>';
//     }
//     return output;
//   };


//   function createHelpTooltip() {
//     if (helpTooltipElement) {
//       helpTooltipElement.parentNode.removeChild(helpTooltipElement);
//     }
//     helpTooltipElement = document.createElement('div');
//     helpTooltipElement.className = 'ol-tooltip hidden';
//     helpTooltip = new Overlay({
//       element: helpTooltipElement,
//       offset: [15, 0],
//       positioning: 'center-left',
//     });
//     map.addOverlay(helpTooltip);
//   }
  
//   /**
//    * Creates a new measure tooltip
//    */
//   function createMeasureTooltip() {
//     if (measureTooltipElement) {
//       measureTooltipElement.parentNode.removeChild(measureTooltipElement);
//     }
//     measureTooltipElement = document.createElement('div');
//     measureTooltipElement.className = 'ol-tooltip ol-tooltip-measure';
//     measureTooltip = new Overlay({
//       element: measureTooltipElement,
//       offset: [0, -15],
//       positioning: 'bottom-center',
//     });
//     map.addOverlay(measureTooltip);
//   }


//   let addMeasureInteraction = () => {
//     draw = new Draw({
//       source: source,
//       type: 'LineString',
//       style: new Style({
//         fill: new Fill({
//           color: 'rgba(255, 255, 255, 0.2)',
//         }),
//         stroke: new Stroke({
//           color: 'rgba(0, 0, 0, 0.5)',
//           lineDash: [10, 10],
//           width: 2
//         }),
//         image: new CircleStyle({
//           radius: 5,
//           stroke: new Stroke({
//             color: 'rgba(0, 0, 0, 0.7)',
//           }),
//           fill: new Fill({
//             color: 'rgba(255, 255, 255, 0.2)',
//           }),
//         }),
//       }),
//     });

//     map.addInteraction(draw);

//     createMeasureTooltip();
//     createHelpTooltip();

//     var listener;
//     draw.on('drawstart', function (evt) {
//       // set sketch
//       sketch = evt.feature;
  
//       /** @type {import("../src/ol/coordinate.js").Coordinate|undefined} */
//       var tooltipCoord = evt.coordinate;
  
//       listener = sketch.getGeometry().on('change', function (evt) {
//         var geom = evt.target;
//         var output;
//         if (geom instanceof Polygon) {
//           output = formatArea(geom);
//           tooltipCoord = geom.getInteriorPoint().getCoordinates();
//         } else if (geom instanceof LineString) {
//           output = formatLength(geom);
//           tooltipCoord = geom.getLastCoordinate();
//         }
//         measureTooltipElement.innerHTML = output;
//         measureTooltip.setPosition(tooltipCoord);
//       });
//     });
  
//     draw.on('drawend', function () {
//       measureTooltipElement.className = 'ol-tooltip ol-tooltip-static';
//       measureTooltip.setOffset([0, -7]);
//       // unset sketch
//       sketch = null;
//       // unset tooltip so that a new one can be created
//       measureTooltipElement = null;
//       createMeasureTooltip();
//       unByKey(listener);
//     });
//   }

// 	useEffect(() => {
// 		if (!map) return;

// 		if (active) {
//       addMeasureInteraction();
// 		} else {
// 			map.removeInteraction(draw);
// 		}

// 		return () => map.removeInteraction(draw);
// 	}, [map, active]);

// 	return null;
// };

// export default MeasureInteraction;