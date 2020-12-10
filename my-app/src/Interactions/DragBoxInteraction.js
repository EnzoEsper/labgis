import React, { useContext, useEffect, useState } from "react";
import {DragBox, Select} from 'ol/interaction';
import MapContext from "../Map/MapContext";
import { Stroke, Style} from 'ol/style';
import * as ol from 'ol';
import { always, shiftKeyOnly, platformModifierKeyOnly } from 'ol/events/condition'
import './DragBoxInteraction.css';
import axios from 'axios';

const DragBoxInteraction = ( { active, setInteractionResponse, lastLayerActive } ) => {
	const { map } = useContext(MapContext);

	useEffect(() => {
		if (!map) return;

		var dragBoxInteraction = new DragBox({
			condition: always,
		})

		dragBoxInteraction.on('boxend', function (e) {
			console.log('boxend', this.getGeometry().getCoordinates());
			
			let coordinates = this.getGeometry().getCoordinates();
			
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
		})

		console.log(`log interaction`, active);

		if (active) {
			map.addInteraction(dragBoxInteraction);
		} else {
			map.removeInteraction(dragBoxInteraction);
		}

		return () => map.removeInteraction(dragBoxInteraction);
	}, [map, active, lastLayerActive]);

	return null;
};

export default DragBoxInteraction;