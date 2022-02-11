const osmtogeojson = require("osmtogeojson");
const L = require("leaflet");
const { QUERIES } = require("constants");
const { OVERPASS_URL } = require("constants");
const { fetchJSONWithUrlSearchParams } = require("utils");

const mapDataStore = {};

const getQuery = (qid, feature) => {
    if (feature === "Boundaries")
        return `[out:json] [timeout:500];
                 relation[wikidata=${qid}];
                 out geom;`;
    return `[out:json][timeout:500];
            (area["wikidata"="${qid}"];nwr(area)[${QUERIES[feature]}];);
            (._;>;);
            out geom;`;
};

const fetchAndStore = async (qid, feature) => {
    const query = getQuery(qid, feature);

    return fetchJSONWithUrlSearchParams(OVERPASS_URL, { data: query }).then(
        (data) => {
            const geojson = osmtogeojson(data);
            const mapLayer = L.geoJSON(geojson, { color: "blue" });
            const location = mapLayer.getBounds().getCenter();
            mapDataStore[`${qid}#${feature}`] = {
                geojson,
                mapLayer,
                location,
            };
        }
    );
};

const expect = async (qid, feature) => {
    if (available(qid, feature)) {
        return true;
    } else {
        return fetchAndStore(qid, feature);
    }
};

const available = (qid, feature) =>
    mapDataStore.hasOwnProperty(`${qid}#${feature}`);

const expectSearch = async () => {
    if (mapDataStore.hasOwnProperty("overview")) return;
    return fetch("/data.json")
        .then((res) => res.json())
        .then((data) => (mapDataStore.overview = data))
        .then(() => createOverview());
};

const createOverview = () => {
    mapDataStore.byQid = {};
    for (const district of Object.keys(mapDataStore.overview)) {
        for (const el of mapDataStore.overview[district]) {
            mapDataStore.byQid[el.qid] = { ...el, district };
        }
    }
};

const getLayer = (qid, feature) => mapDataStore[`${qid}#${feature}`].mapLayer;
const getGeojson = (qid, feature) => mapDataStore[`${qid}#${feature}`].geojson;

const startDownload = (qid, feature) => {
    const string = JSON.stringify(getGeojson(qid, feature));
    const bytes = new TextEncoder().encode(string);
    const blob = new Blob([bytes], { type: "application/json;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${qid} - ${feature}.geojson`;
    a.click();
};

const getOverview = (qid) => mapDataStore.byQid[qid];
const getAllOverview = () => mapDataStore.byQid;
const isValidQid = (maybeQid) => mapDataStore.byQid.hasOwnProperty(maybeQid);

module.exports = {
    expect,
    available,
    getLayer,
    startDownload,
    getOverview,
    getAllOverview,
    expectSearch,
    isValidQid,
};
