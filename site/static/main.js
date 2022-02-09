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

const QUERIES = {
    "Government Offices": `"office"="government"`,
    "Hospitals": `"amenity"="hospital"`,
    "Power": `"power"`,
    "Police Stations": `"amenity"="police"`,
    "Fire Stations": `"amenity"="fire_station"`,
    "Waterways/Rivers": `"waterway"`,
    "Ponds": `"water"="pond"`,
    "Farmlands": `"landuse"="farmland"`,
    "Roads": `"highway"`,
    "Rails": `"railway"`,
    "Taxi": `"amenity"="taxi"`,
    "Petrol Pumps": `"amenity"="fuel"`,
    "Hotels": `"tourism"="hotel"`,
    "Restaurants": `"amenity"="restaurant"`,
    "Parking": `"amenity"="parking"`,
    "Cinemas": `"amenity"="cinema"`,
    "Toilets": `"amenity"="toilets"`,
    "Religion": `"amenity"="place_of_worship"`,
    "Schools": `"amenity"="school"`,
    "Colleges": `"amenity"="college"`,
    "Kindergartens": `"amenity"="kindergarten"`,
    "Community centres": `"amenity"="community_centre"`,
    "Libraries": `"amenity"="library"`,
    "Ration shops": `name"="Ration shop"`,
    "Banks": `"amenity"="bank"`,
    "ATMs": `"amenity"="atm"`,
    "Post Offices": `"amenity"="post_office"`,
    "Shops": `"shop"="yes"`,
    "Sports": `"sport"`,
    "Drinking Water": `"amenity"="drinking_water"`,
    "Free WiFi": `"wifi"`,
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

currentQid = document.querySelector("#qid").textContent.trim();
loadNewQid(currentQid);

const reconfigure = (selection) => {
    configureButton = document.getElementById("configuration");
    configureButton.textContent = selection;
    currentConfiguration = selection;
    loadNewQid(currentQid);
};
