import * as olSource from "ol/source";

function tileWMS(url, params) {
	return new olSource.TileWMS({
    url: url,
    params: params
  });
}

export default tileWMS;