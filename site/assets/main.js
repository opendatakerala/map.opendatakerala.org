const osmtogeojson = require('osmtogeojson');

const addIndiaBoundaries = require("./india-boundaries");
const {
    KERALA_BOUNDS,
    MIN_ZOOM,
    OVERPASS_URL,
    QUERIES,
} = require("./constants");
const { fetchJSONWithUrlSearchParams } = require("./utils");

const map = L.map("map", {
    maxBounds: KERALA_BOUNDS,
    minZoom: MIN_ZOOM,
    maxBoundsViscosity: 0.9,
}).fitBounds(KERALA_BOUNDS);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

addIndiaBoundaries(map);

var currentQid;
var currentConfiguration = "Boundaries";
var currentGeoJson;
var currentLayer;
var currentLsg = document.querySelector("#lsgTitle").textContent.trim();
const downloadButton = document.querySelector("#download");
downloadButton.addEventListener("click", () => {
    const string = JSON.stringify(currentGeoJson);
    const bytes = new TextEncoder().encode(string);
    const blob = new Blob([bytes], { type: "application/json;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${currentLsg}.geojson`;
    a.click();
});

const getQuery = (qid, config) => {
    if (config === "Boundaries")
        return `[out:json] [timeout:500];
                 relation[wikidata=${qid}];
                 out geom;`;
    return `[out:json][timeout:500];
            (area["wikidata"="${qid}"];nwr(area)[${QUERIES[config]}];);
            (._;>;);
            out geom;`;
};

const loadNewQid = (qid) => {
    const query = getQuery(qid, currentConfiguration);

    fetchJSONWithUrlSearchParams(OVERPASS_URL, { data: query })
        .then((data) => {
            const geojson = osmtogeojson(data);
            currentGeoJson = geojson;
            downloadButton.disabled = false;
            document.querySelector("#lsgTitle").textContent = `${currentLsg}`;
            const newlayer = L.geoJSON(geojson, { color: "blue" }).addTo(map);
            if (currentLayer) map.removeLayer(currentLayer);
            currentLayer = newlayer;
            const location = newlayer.getBounds().getCenter();
            map.flyTo(location, 12);
            map.setMaxBounds(KERALA_BOUNDS);
        })
        .catch((err) => console.error(err));
};

currentQid = document.querySelector("[data-mk-key=qid]").textContent.trim();
loadNewQid(currentQid);

const reconfigure = (selection) => {
    configureButton = document.getElementById("configuration");
    configureButton.textContent = selection;
    currentConfiguration = selection;
    loadNewQid(currentQid);
};
