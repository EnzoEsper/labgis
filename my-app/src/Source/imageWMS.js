import OlSourceImageWMS from "ol/source/ImageWMS";

function imageWMS(url, params) {
	return new OlSourceImageWMS({
    url: url,
    params: params
  });
}

export default imageWMS;