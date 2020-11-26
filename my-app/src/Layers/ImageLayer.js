import { useContext, useEffect } from "react";
import MapContext from "../Map/MapContext";
import OlImageLayer from 'ol/layer/Image';

const ImageLayer = ({ title, source, zIndex = 0 }) => {
	const { map } = useContext(MapContext);

	useEffect(() => {
		if (!map) return;

		let imageLayer = new OlImageLayer({
			title,
			source
		});

		map.addLayer(imageLayer);
		imageLayer.setZIndex(zIndex);

		return () => {
			if (map) {
				map.removeLayer(imageLayer);
			}
		};
	}, [map]);

	return null;
};

export default ImageLayer;