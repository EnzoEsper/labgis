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
// import Interactions from './Interactions/Interactions';
// import DragBoxInteraction from './Interactions/DragBoxInteraction';

const App = () => {
	const [center, setCenter] = useState([-59, -27.5]);
	const [zoom, setZoom] = useState(5);
	const [showLayer1, setShowLayer1] = useState(false);
	const [showLayer2, setShowLayer2] = useState(false);
	const [layersVisibility, setLayersVisibility] = useState({});

	// const setLayer1 = (name) => {
	// 	setShowLayer1(!showLayer1);
	// }

	// const setLayer2 = (name) => {
	// 	setShowLayer2(!showLayer2);
	// }

	// state para controlar la visibilidad de cada una de las capas
	const onLayerClick = (name) => {
		// si la visibilidad de una capa no se encuentra definida inicialmente se toma una por defecto
		// de lo contrario, se asigna una visibilidad inversa
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

	return (
		<div className="map">
			<SubMenu onLayerClick={onLayerClick}/>
			<Map center={center} zoom={zoom}>
				<Layers>
					<TileLayer
						source={tileWMS("http://wms.ign.gob.ar/geoserver/wms", {LAYERS: 'capabaseargenmap', VERSION: '1.1.1'})}
						zIndex={0}
					/>
					<ActiveImageLayersList layers={layersVisibility}/>
					{/* {showLayer1 && (
						<ImageLayer title={"veg_arborea"} source={imageWMS("http://localhost:8380/?SERVICE=WMS&REQUEST=GetCapabilities", {LAYERS: 'veg_arborea'})} zIndex={1}/>
					)}
					{showLayer2 && (
						<ImageLayer title={"red_vial"} source={imageWMS("http://localhost:8380/?SERVICE=WMS&REQUEST=GetCapabilities", {LAYERS: 'red_vial'})} zIndex={2}/>
					)} */}
					{/* {showLayer2 && (
						<VectorLayer
							source={vector({ features: new GeoJSON().readFeatures(geojsonObject2, { featureProjection: get('EPSG:3857') }) })}
							style={styles.MultiPolygon}
						/>
					)} */}
				</Layers>
				
				<Controls>
					<FullScreenControl />
				</Controls>

				{/* <Interactions>
					<DragBoxInteraction />
				</Interactions> */}
			</Map>
			{/* <div>
				<input
					type="checkbox"
					checked={showLayer1}
					onChange={event => setShowLayer1(event.target.checked)}
				/> Johnson County
			</div>
			<div>
				<input
					type="checkbox"
					checked={showLayer2}
					onChange={event => setShowLayer2(event.target.checked)}
				/> Wyandotte County
			</div> */}
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