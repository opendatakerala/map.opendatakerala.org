var keralaBounds = [[7.477, 78.234][13.5806, 74.2676]]
var map = L.map('map', {
    maxBounds: keralaBounds,
    minZoom: 7,
    maxBoundsViscosity: 0.9
}).setView([10.6103587, 76.0569874], 7);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

handle_india_boundaries(map);


const slug = window.location.pathname;
const lsgselect = document.getElementById("lsg-select")
lsgselect.value = slug;

lsgselect.addEventListener('change', e => {
    const newLSGSelectedEvent = new CustomEvent('new-lsg-selected', {detail: e.target.value})
    document.dispatchEvent(newLSGSelectedEvent)
})


const loadNewQid = (qid) => {
    const query = `[out:json] [timeout:500];
            relation[wikidata=${qid}];
            out geom;`

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
            console.log(data)
            const geojson = osmtogeojson(data)
            const newlayer = L.geoJSON(geojson, { color: "blue" }).addTo(map)
            const location = newlayer.getBounds().getCenter()
            map.flyTo(location, 12)
            map.setMaxBounds(keralaBounds)
        })
        .catch((err) => console.error(err));
}

const qid = document.querySelector('#qid').textContent;
loadNewQid(qid)

document.addEventListener('new-lsg-selected', (e) => {
    window.location.pathname = e.detail
})