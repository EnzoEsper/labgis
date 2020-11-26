import React, { useContext, useEffect, useState } from "react";
import DragBox from 'ol/interaction/DragBox';
import MapContext from "../Map/MapContext";
import { Stroke, Style} from 'ol/style';
import * as ol from 'ol';
import { always } from 'ol/events/condition'
const DragBoxInteraction = () => {
	const { map } = useContext(MapContext);

	useEffect(() => {
		if (!map) return;

		let dragBoxInteraction = new DragBox({
			condition: always,
			style: new Style({
				stroke: new Stroke({
					color: [0, 0, 255, 1]
				})
			})
    });

		map.interactions.push(dragBoxInteraction);

		//return () => map.controls.remove(dragBoxInteraction);
	}, [map]);

	return null;
};

export default DragBoxInteraction;