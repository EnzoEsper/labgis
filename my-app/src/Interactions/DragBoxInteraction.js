import React, { useContext, useEffect, useState } from "react";
import {DragBox, Select} from 'ol/interaction';
import MapContext from "../Map/MapContext";
import { Stroke, Style} from 'ol/style';
import * as ol from 'ol';
import { always, shiftKeyOnly, platformModifierKeyOnly } from 'ol/events/condition'
import './DragBoxInteraction.css';

const DragBoxInteraction = () => {
	const { map } = useContext(MapContext);

	useEffect(() => {
		if (!map) return;

		var dragBoxInteraction = new DragBox({
			condition: shiftKeyOnly,
		})

		dragBoxInteraction.on('boxend', function (e) {
			console.log('boxend', this.getGeometry().getCoordinates());
		})

		map.addInteraction(dragBoxInteraction);

		return () => map.controls.remove(dragBoxInteraction);
	}, [map]);

	return null;
};

export default DragBoxInteraction;