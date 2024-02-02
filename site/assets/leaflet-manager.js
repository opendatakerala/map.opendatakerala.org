const L = require("leaflet");
const Tangram = require('tangram');

const addIndiaBoundaries = require("./india-boundaries");
const { KERALA_BOUNDS, MIN_ZOOM } = require("./constants");

const additionalFeatures = [];

const osmLayer = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxBounds: KERALA_BOUNDS,
    attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
});

const tangramLayer = Tangram.leafletLayer({
    maxBounds: KERALA_BOUNDS,
    scene: '/scene.yaml',
    attribution: '<a href="https://mapzen.com/tangram" target="_blank">Tangram</a> | &copy; OSM contributors'
});


const map = L.map("map", {
    minZoom: MIN_ZOOM,
    maxBoundsViscosity: 0.9,
    zoomControl: false,
    layers: [osmLayer]
}).fitBounds(KERALA_BOUNDS);

L.control.zoom({
    position: 'bottomright'
}).addTo(map);


const baseMaps = {
    "Stable": osmLayer,
    "Experimental": tangramLayer
}

addIndiaBoundaries(map);

let overlays = {};

const layerControl = L.control.layers(baseMaps, overlays).addTo(map)

const replaceOverlay = (geojson) => {
    Object.values(overlays).forEach(layer => {
        layerControl.removeLayer(layer);
        map.removeLayer(layer);
    });
    const newLayer = L.geoJSON(geojson, {color: "blue"})
    overlays = {
        data: newLayer
    }
    newLayer.addTo(map);
    layerControl.addOverlay(newLayer, "data")
    map.flyToBounds(newLayer.getBounds().pad(0.05));
}

//         tangramLayer.scene.setDataSource("dynamic", { type: "GeoJSON", data: geojson });
//         tangramLayer?.scene?.setDataSource("dynamic", { type: "GeoJSON", data: {} })

module.exports = {
    map,
    replaceOverlay,
};