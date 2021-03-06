import React, { useState } from 'react';
import './App.css';
import Map from "./Map";
import { Layers, TileLayer, VectorLayer, ImageLayer } from "./Layers";
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';
import { osm, vector, tileWMS, imageWMS } from "./Source";
import { fromLonLat, get } from 'ol/proj';
import GeoJSON from 'ol/format/GeoJSON';
import { Controls, FullScreenControl } from "./Controls";
import SubMenu from './components/SubMenu';
import ActiveImageLayersList from './components/ActiveImageLayersList';
import Interactions from './Interactions/Interactions';
import DragBoxInteraction from './Interactions/DragBoxInteraction';
import { ClickInteraction, MeasureInteraction, TraceRouteInteraction } from './Interactions';
import FullScreenDialog from './components/FullScreenDialog';
// import Paper from '@material-ui/core/Paper';
import SimplePaper from './components/SimplePaper';
import MediaCard from './components/MediaCard';
import CardContentBlock from './components/CardContentBlock';

const App = () => {
	const [center, setCenter] = useState([-59, -27.5]);
	const [zoom, setZoom] = useState(5);
	const [layersVisibility, setLayersVisibility] = useState({});
	const [interactionsActive, setInteractionsActive] = useState([{Navegacion: true}, {Consulta: false}, {Distancias: false}, {TrazarRuta: false}]);
	const [interactionResponse, setInteractionResponse] = useState([]);
	const [lastLayerActive, setLastLayerActive] = useState("");
	const [layersActive, setLayersActive] = useState([]);

	// state for manage the visibility of each layer and its legends
	const onLayerClick = (name) => {


		let layerFound = layersActive.find(layer => layer === name);

		if (!layerFound) {
			setLayersActive([...layersActive, name]);
		} else {
			const index = layersActive.indexOf(name);
			if (index > -1) {
				layersActive.splice(index, 1);
			}

			setLayersActive(layersActive);
		}

		// if the visibility of a certain layer is not defined, then takes one as a default
		let visibility = layersVisibility[name];
		
		if (visibility == undefined) {
			visibility = true;
		} else {
			visibility = !visibility;
		}

		setLayersVisibility({
			...layersVisibility,
			[name]: visibility
		});
	}

	const onInteractionClick = (name) => {
		
		let newInteractions = interactionsActive.map(interaction => {
			if (Object.keys(interaction)[0] == name) {
				return { [name] : true };
			}
			return { [Object.keys(interaction)[0]] : false };
		})

		setInteractionsActive([
			...newInteractions
		])
		
	}

	const onLastLayerClick = (name) => {
		setLastLayerActive(name);
	};

	return (
		<div className="map">
			{interactionResponse.length > 0 && <FullScreenDialog interactionResponse={interactionResponse} setInteractionResponse={setInteractionResponse}/>}
			<SubMenu onLastLayerClick={onLastLayerClick} onLayerClick={onLayerClick} onInteractionClick={onInteractionClick}/>
			{layersActive.length > 0 && <CardContentBlock layersActive={layersActive}/>}
			<Map center={center} zoom={zoom}>
				
				<Interactions>
					<DragBoxInteraction lastLayerActive={lastLayerActive} active={interactionsActive[1].Consulta} setInteractionResponse={setInteractionResponse}/>
					<ClickInteraction lastLayerActive={lastLayerActive} active={interactionsActive[1].Consulta} setInteractionResponse={setInteractionResponse}/>
					<MeasureInteraction active={interactionsActive[2].Distancias}/>
					<TraceRouteInteraction active={interactionsActive[3].TrazarRuta}/>
				</Interactions>

				<Layers>
					<TileLayer
						source={tileWMS("http://wms.ign.gob.ar/geoserver/wms", {LAYERS: 'capabaseargenmap', VERSION: '1.1.1'})}
						zIndex={0}
					/>
					<ActiveImageLayersList layers={layersVisibility}/>
				</Layers>
				
				<Controls>
					<FullScreenControl />
				</Controls>

			</Map>
		</div>
	);
}

export default App;


// let styles = {
// 	'Point': new Style({
// 		image: new CircleStyle({
// 			radius: 10,
// 			fill: null,
// 			stroke: new Stroke({
// 				color: 'magenta',
// 			}),
// 		}),
// 	}),
// 	'Polygon': new Style({
// 		stroke: new Stroke({
// 			color: 'blue',
// 			lineDash: [4],
// 			width: 3,
// 		}),
// 		fill: new Fill({
// 			color: 'rgba(0, 0, 255, 0.1)',
// 		}),
// 	}),
// 	'MultiPolygon': new Style({
// 		stroke: new Stroke({
// 			color: 'blue',
// 			width: 1,
// 		}),
// 		fill: new Fill({
// 			color: 'rgba(0, 0, 255, 0.1)',
// 		}),
// 	}),
// };

// const geojsonObject = {
// 	"type": "FeatureCollection",
// 	"features": [
// 		{
// 			"type": "Feature",
// 			"properties": {
// 				"kind": "county",
// 				"name": "Wyandotte",
// 				"state": "KS"
// 			},
// 			"geometry": {
// 				"type": "MultiPolygon",
// 				"coordinates": [
// 					[
// 						[
// 							[
// 								-94.8627,
// 								39.202
// 							],
// 							[
// 								-94.901,
// 								39.202
// 							],
// 							[
// 								-94.9065,
// 								38.9884
// 							],
// 							[
// 								-94.8682,
// 								39.0596
// 							],
// 							[
// 								-94.6053,
// 								39.0432
// 							],
// 							[
// 								-94.6053,
// 								39.1144
// 							],
// 							[
// 								-94.5998,
// 								39.1582
// 							],
// 							[
// 								-94.7422,
// 								39.1691
// 							],
// 							[
// 								-94.7751,
// 								39.202
// 							],
// 							[
// 								-94.8627,
// 								39.202
// 							]
// 						]
// 					]
// 				]
// 			}
// 		}
// 	]
// };
// const geojsonObject2 = {
// 	"type": "FeatureCollection",
// 	"features": [
// 		{
// 			"type": "Feature",
// 			"properties": {
// 				"kind": "county",
// 				"name": "Johnson",
// 				"state": "KS"
// 			},
// 			"geometry": {
// 				"type": "MultiPolygon",
// 				"coordinates": [
// 					[
// 						[
// 							[
// 								-94.9065,
// 								38.9884
// 							],
// 							[
// 								-95.0544,
// 								38.9829
// 							],
// 							[
// 								-95.0544,
// 								38.7365
// 							],
// 							[
// 								-94.9668,
// 								38.7365
// 							],
// 							[
// 								-94.6108,
// 								38.7365
// 							],
// 							[
// 								-94.6108,
// 								38.846
// 							],
// 							[
// 								-94.6053,
// 								39.0432
// 							],
// 							[
// 								-94.8682,
// 								39.0596
// 							],
// 							[
// 								-94.9065,
// 								38.9884
// 							]
// 						]
// 					]
// 				]
// 			}
// 		}
// 	]
// };