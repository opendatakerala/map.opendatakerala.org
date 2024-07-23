const L = require("leaflet");
const osmtogeojson = require("osmtogeojson");
const initializeLeafletPanelLayers = require("./leaflet-panel-layers");
initializeLeafletPanelLayers(L);
const Tangram = require("tangram");

const addIndiaBoundaries = require("./india-boundaries");
const { KERALA_BOUNDS, MIN_ZOOM } = require("./constants");
const { getOverlays, fetchData } = require("map-utils");

const additionalFeatures = [];

const osmLayer = L.tileLayer(
  "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  {
    maxBounds: KERALA_BOUNDS,
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
);

const tangramLayer = Tangram.leafletLayer({
  maxBounds: KERALA_BOUNDS,
  scene: "/scene.yaml",
  attribution:
    '<a href="https://mapzen.com/tangram" target="_blank">Tangram</a> | &copy; OSM contributors',
});

const map = L.map("map", {
  minZoom: MIN_ZOOM,
  maxBoundsViscosity: 0.9,
  zoomControl: false,
  layers: [osmLayer],
}).fitBounds(KERALA_BOUNDS);

L.control.zoom({
  position: "bottomright",
}).addTo(map);

const baseMaps = {
  "Stable": osmLayer,
  "Experimental": tangramLayer,
};

let baseLayers = [
  {
    name: "Stable",
    layer: osmLayer,
    active: true,
  },
  {
    name: "Experimental",
    layer: tangramLayer,
  },
];

addIndiaBoundaries(map);

const isNarrow = window.innerWidth < 400;
const shouldBeCollapsed = isNarrow;

let layerControl = new L.Control.PanelLayers(baseLayers, undefined, {collapsed: shouldBeCollapsed, compact: true, compactOffset: 50});
layerControl.addTo(map);

let overlays = [];

const availableData = {};

const loadLayer = (qid, l) => {
    return fetchData(qid, l.name).then((d) => osmtogeojson(d)).then((d) => {
      availableData[l.name] = d;
      l.layer.addData(d);
      map.flyToBounds(l.layer.getBounds().pad(0.05));
      return l.layer;
    });
}

const startJSONDownload = (filename, data) => {
  const string = JSON.stringify(data);
  const bytes = new TextEncoder().encode(string);
  const blob = new Blob([bytes], { type: "application/json;charset=utf-8" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
};

const replaceOverlay = async ({qid, lsg}) => {
  layerControl.off("panel:selected");
  layerControl.off("panel:download");
  overlays.forEach((g) => g.layers.forEach((l) => layerControl.removeLayer(l)));
  overlays = getOverlays();
  overlays.forEach((l) => layerControl.addOverlayGroup(l));
  layerControl.on("panel:selected", (l) => {
    if (l.overlay) {
        loadLayer(qid, l)
    }
  });
  layerControl.on("panel:download", (l) => {
    startJSONDownload(
      `${lsg.len} - ${l.name}.geojson`,
      availableData[l.name]
    );
  })
  layerControl.check(overlays[0].layers[0])
};

module.exports = {
  map,
  replaceOverlay,
};
