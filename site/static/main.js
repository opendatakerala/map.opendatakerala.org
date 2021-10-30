var keralaBounds = [[7.477, 78.234][(13.5806, 74.2676)]];
var map = L.map("map", {
    maxBounds: keralaBounds,
    minZoom: 7,
    maxBoundsViscosity: 0.9,
}).setView([10.6103587, 76.0569874], 7);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

handle_india_boundaries(map);

const slug = window.location.pathname;
const lsgselect = document.getElementById("lsg-select");
lsgselect.value = slug;

lsgselect.addEventListener("change", (e) => {
    const newLSGSelectedEvent = new CustomEvent("new-lsg-selected", {
        detail: {
            lsgCode: e.target.value,
            lsgName: e.target.options[e.target.selectedIndex].innerHTML,
        },
    });
    document.dispatchEvent(newLSGSelectedEvent);
});

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

const QUERIES = {
    "Roads": `"highway"`,
    "Hospitals": `"amenity"="hospital"`
}

const getQuery = (qid, config) => {
    if (config === "Boundaries")
        return `[out:json] [timeout:500];
                 relation[wikidata=${qid}];
                 out geom;`;
    return `[out:json][timeout:500];
            (area["wikidata"="${qid}"];nwr(area)[${QUERIES[config]}];);
            (._;>;);
            out geom;`
};

const loadNewQid = (qid) => {
    const query = getQuery(qid, currentConfiguration);

    const params = new URLSearchParams();
    params.append("data", query);

    fetch("https://overpass-api.de/api/interpreter", {
        method: "POST",
        body: params,
        cors: true,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            const geojson = osmtogeojson(data);
            console.log(geojson);
            currentGeoJson = geojson;
            downloadButton.disabled = false;
            document.querySelector("#lsgTitle").textContent = `${currentLsg}`;
            const newlayer = L.geoJSON(geojson, { color: "blue" }).addTo(map);
            if (currentLayer) map.removeLayer(currentLayer);
            currentLayer = newlayer;
            const location = newlayer.getBounds().getCenter();
            map.flyTo(location, 12);
            map.setMaxBounds(keralaBounds);
        })
        .catch((err) => console.error(err));
};

const qid = document.querySelector("#qid").textContent.trim();
loadNewQid(qid);

document.addEventListener("new-lsg-selected", (e) => {
    downloadButton.disabled = true;
    map.removeLayer(currentLayer);
    document.querySelector(
        "#lsgTitle"
    ).textContent = `Going to ${e.detail.lsgName}...`;
    fetch(`${e.detail.lsgCode}index.json`)
        .then((res) => res.json())
        .then((data) => {
            loadNewQid(data.qid);
            currentLsg = data.len;
        });
});

const reconfigure = (selection) => {
    configureButton = document.getElementById("configuration");
    configureButton.textContent = selection;
    currentConfiguration = selection;
    loadNewQid(qid);
};
