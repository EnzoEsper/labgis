import React, { useContext, useEffect, useState } from "react";
import {DragBox, Select} from 'ol/interaction';
import MapContext from "../Map/MapContext";
import { Stroke, Style} from 'ol/style';
import * as ol from 'ol';
import { always, shiftKeyOnly, platformModifierKeyOnly } from 'ol/events/condition'
import './DragBoxInteraction.css';
import axios from 'axios';

const ClickInteraction = ( { active, setInteractionResponse, lastLayerActive } ) => {
  const { map } = useContext(MapContext);

  const onMapClick = (event) => {
    console.log(`click!`, event.coordinate);
    
    const coordinates = event.coordinate;

    axios({
      method: 'post',
      url: 'http://localhost:3005/test',
      data: {
        coordinates,
        lastLayerActive
      }
    })
      .then(response => {
        console.log(response);
        setInteractionResponse(response.data);
      })
      .catch(err => console.log(err));
  };

	useEffect(() => {
		if (!map) return;

		if (active) {
      map.on('click', onMapClick)
		} else {
			map.un('click', onMapClick)
		}

		return () => map.un('click', onMapClick);
	}, [map, active, lastLayerActive]);

	return null;
};

export default ClickInteraction;