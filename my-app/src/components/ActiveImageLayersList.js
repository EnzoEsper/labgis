import React from 'react';
import { Layers, TileLayer, VectorLayer, ImageLayer } from "../Layers";
import { osm, vector, tileWMS, imageWMS } from "../Source";

const ActiveImageLayersList = (props) => {
  let layersVisibilityArray = Object.entries(props.layers);
  return layersVisibilityArray.map(layer => {
    if (layer[1] === true) {
      return <ImageLayer title={layer[0]} key={layer[0]} source={imageWMS("http://localhost:8380/?SERVICE=WMS&REQUEST=GetCapabilities", {LAYERS: layer[0]})} zIndex={1}/>
    } else {
      return null;
    }
  })
}

export default ActiveImageLayersList;