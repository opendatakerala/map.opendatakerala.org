const L = require("leaflet");

const addIndiaBoundaries = require("./india-boundaries");
const { KERALA_BOUNDS, MIN_ZOOM } = require("./constants");
const {
    startDownload,
    expect,
    available,
    getLayer,
    getOverview,
    expectSearch,
    getAllOverview,
    isValidQid,
} = require("map-utils");

const map = L.map("map", {
    minZoom: MIN_ZOOM,
    maxBoundsViscosity: 0.9,
}).fitBounds(KERALA_BOUNDS);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxBounds: KERALA_BOUNDS,
    attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

addIndiaBoundaries(map);

const state = {
    qid: document.querySelector("[data-mk-key=qid]").textContent.trim(),
    feature: "Boundaries",
    len: document.querySelector("[data-mk-key=len]").textContent.trim(),
    displayedLayers: [],
    searchSetup: false,
};

const setQid = (qid) => {
    state.qid = qid;
    const { len, lml } = getOverview(qid);
    state.len = len;
    state.lml = lml;
    mapChangeRequired();
    skeletonChangeRequired();
};

const setFeature = (feature) => {
    state.feature = feature;
    configureButton = document.getElementById("configuration");
    configureButton.textContent = feature;
    mapChangeRequired();
};

const downloadButton = document.querySelector("#download");
downloadButton.addEventListener("click", () => {
    startDownload(state.qid, state.feature);
});
const disableDownload = () => (downloadButton.disabled = true);
const enableDownload = () => (downloadButton.disabled = false);

const spinner = document.querySelector("[role=status]");
showSpinner = () => (spinner.style.visibility = "visible");
hideSpinner = () => (spinner.style.visibility = "hidden");

const mapChangeRequired = async () => {
    showSpinner();
    state.displayedLayers.forEach((oldLayer) => map.removeLayer(oldLayer));
    disableDownload();

    await expect(state.qid, state.feature);
    if (!available(state.qid, state.feature)) return;

    const layer = getLayer(state.qid, state.feature);

    state.displayedLayers = [layer];
    map.addLayer(layer);
    map.flyTo(layer.getBounds().getCenter(), 12);
    hideSpinner();
    enableDownload();
};

const changeAll = (selector, content) =>
    document
        .querySelectorAll(selector)
        .forEach((el) => (el.textContent = content));

const skeletonChangeRequired = () => {
    changeAll("[data-mk-key=qid]", state.qid);
    changeAll("[data-mk-key=len]", state.len);
    changeAll("[data-mk-key=lml]", state.lml);
};

const featureSelectionButtons = document.querySelectorAll("[data-mk-feature]");
featureSelectionButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
        const feature = e.target.getAttribute("data-mk-feature");
        setFeature(feature);
    });
});

mapChangeRequired();

const setUpSearch = () => {
    if (state.searchSetup) return;
    expectSearch().then(() => {
        const datalist = document.querySelector("#search-datalist");
        const overview = getAllOverview();
        for (const qid of Object.keys(overview)) {
            const opt = document.createElement("option");
            opt.value = qid;
            opt.label = `${overview[qid].len} (${overview[qid].district}) | ${overview[qid].lml}`;
            datalist.appendChild(opt);
        }
        state.searchSetup = true;
    });
};

document.querySelector("#search").addEventListener("click", setUpSearch);

document.querySelector("#search").addEventListener("input", (e) => {
    const maybeQid = e.target.value;
    if (!isValidQid(maybeQid)) return;
    e.target.value = "";
    setQid(maybeQid);
});
