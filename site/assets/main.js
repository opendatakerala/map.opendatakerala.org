const {
    expect,
    available,
    getOverview,
    expectSearch,
    getAllOverview,
    isValidQid,
    getGeojson,
} = require("map-utils");

const { isEmptyObject } = require('./utils');

const { map, setBaseLayer, addGeojsonToMap, removeCurrentLayers } = require('./leaflet-manager');

const { wikiBaseGetEntities, fetchWikiPageSummary } = require('./wiki-utils');

import { WikiData } from './components/WikiData';
import { WikiPedia } from './components/WikiPedia';


const state = {
    qid: document.querySelector("[data-mk-key=qid]")?.textContent?.trim() ?? "Q1186",
    feature: "Boundaries",
    len: document.querySelector("[data-mk-key=len]")?.textContent?.trim() ?? "Kerala",
    searchSetup: false,
};

const setQid = (qid) => {
    setQidExceptUrlChange(qid);
    urlChangeRequired();
};

const setQidExceptUrlChange = (qid) => {
    state.qid = qid;
    const { len, lml, urlpath, district } = getOverview(qid);
    state.len = len;
    state.lml = lml;
    state.district = district;
    state.urlpath = urlpath;
    mapChangeRequired();
    skeletonChangeRequired();
};

const setFeature = (feature) => {
    state.feature = feature;
    configureButton = document.getElementById("configuration");
    configureButton.textContent = feature;
    mapChangeRequired();
};

const startJSONDownload = (filename, data) => {
    const string = JSON.stringify(data);
    const bytes = new TextEncoder().encode(string);
    const blob = new Blob([bytes], { type: "application/json;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    a.click();
};

const downloadButton = document.querySelector("#download");
downloadButton.addEventListener("click", () => {
    startJSONDownload(
        `${state.len} - ${state.feature}.geojson`,
        getGeojson(state.qid, state.feature)
    );
});
const disableDownload = () => (downloadButton.disabled = true);
const enableDownload = () => (downloadButton.disabled = false);

const spinner = document.querySelector("[role=status]");
const showSpinner = () => (spinner.style.visibility = "visible");
const hideSpinner = () => (spinner.style.visibility = "hidden");

const showUselessWarning = () => alert("Sorry, no data available for that.");

const mapChangeRequired = async () => {
    showSpinner();
    removeCurrentLayers();
    disableDownload();

    await expect(state.qid, state.feature);
    if (!available(state.qid, state.feature)) return;

    const geojson = getGeojson(state.qid, state.feature);

    const layer = addGeojsonToMap(geojson);
    hideSpinner();
    if (isEmptyObject(layer.getBounds())) {
        showUselessWarning();
    } else {
        map.flyToBounds(layer.getBounds().pad(0.05));
        enableDownload();
    }
};

const changeAll = (selector, content) =>
    document
        ?.querySelectorAll(selector)
        ?.forEach((el) => (el.textContent = content));

const changeHTML = (selector, content) =>
    document.querySelectorAll(selector).forEach((el) => (el.innerHTML = content))

const skeletonChangeRequired = () => {
    changeAll("[data-mk-key=qid]", state.qid);
    changeAll("[data-mk-key=len]", state.len);
    changeAll("[data-mk-key=lml]", state.lml);
    changeAll("[data-mk-key=district]", state.district);
    changeHTML("[data-mk-key=lsg-title]", `${state.len} (<a href="/${state.district.toLowerCase()}">${state.district}</a>)`)
    document.querySelector(
        "#wikidata-link"
    ).href = `https://www.wikidata.org/wiki/${state.qid}`;
};

const urlChangeRequired = () => {
    window.history.pushState({ qid: state.qid }, "", `/${state.urlpath}/`);
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

window.history.replaceState({ qid: state.qid }, "", window.location.pathname);

window.addEventListener("popstate", (event) => {
    setQidExceptUrlChange(event.state.qid);
});

document.querySelector('#switch-to-osm').addEventListener('click', () => setBaseLayer('osm'))
document.querySelector('#switch-to-tan').addEventListener('click', () => setBaseLayer('tan'))

// TODO: Show an alert for
// This portal is under active development. Features maybe added or removed without
// notice. Contact <a href="mailto:opendatakerala@gmail.com">opendatakerala@gmail.com</a> for more information.

customElements.define('wiki-data', WikiData)
customElements.define('wiki-pedia', WikiPedia)

document.body.addEventListener('wiki-data-loaded', (e) => {
    const { data, qid } = e.detail;
    document.querySelectorAll('wiki-pedia').forEach(n => {
        const lang = n.getAttribute('lang');
        const wikiname = `${lang}wiki`;
        const title = data?.entities?.[qid]?.sitelinks?.[wikiname]?.title
        n.setAttribute("title", title || "");
    })
});
