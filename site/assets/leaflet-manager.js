const L = require("leaflet");
const Tangram = require('tangram');

const addIndiaBoundaries = require("./india-boundaries");
const { KERALA_BOUNDS, MIN_ZOOM } = require("./constants");

const additionalFeatures = [];

const map = L.map("map", {
    minZoom: MIN_ZOOM,
    maxBoundsViscosity: 0.9,
    zoomControl: false,
}).fitBounds(KERALA_BOUNDS);

L.control.zoom({
    position: 'topright'
}).addTo(map);

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

let baseLayer = 'tan'
if (baseLayer === 'osm') {
    osmLayer.addTo(map);
} else {
    tangramLayer.addTo(map);
}

addIndiaBoundaries(map);

const setBaseLayer = (l) => {
    if (l === 'osm') {
        if (map.hasLayer(tangramLayer)) {
            tangramLayer.remove()
        }
        osmLayer.addTo(map);
    } else {
        if (map.hasLayer(osmLayer)) {
            osmLayer.remove()
        }
        tangramLayer.addTo(map);
    }
}

const addGeojsonToMap = (geojson) => {
    const feature = { geojson };
    feature.layer = L.geoJSON(geojson, { color: "blue" });
    if (baseLayer === 'osm') {
        feature.layer.addTo(map);
    } else {
        tangramLayer.scene.setDataSource("dynamic", { type: "GeoJSON", data: geojson });
    }
    additionalFeatures.push(feature);
    return feature.layer;
}

const removeCurrentLayers = () => {
    additionalFeatures.forEach(f => {
        map.removeLayer(f.layer);
        tangramLayer.scene.setDataSource("dynamic", { type: "GeoJSON", data: {} })
    })
}

module.exports = {
    map,
    setBaseLayer,
    addGeojsonToMap,
    removeCurrentLayers
};