const {
    expect,
    available,
    getOverview,
    expectSearch,
    getAllOverview,
    isValidQid,
    getGeojson,
} = require("map-utils");
const { fetchWikipediaPageByQid, retrieveWikiPage } = require("wiki-utils");

const { isEmptyObject } = require('./utils');

const { map, setBaseLayer, addGeojsonToMap, removeCurrentLayers } = require('./leaflet-manager');

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
    wikiChangeRequired();
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
        .querySelectorAll(selector)
        .forEach((el) => (el.textContent = content));

const changeHTML = (selector, content) =>
    document.querySelectorAll(selector).forEach((el) => (el.innerHTML = content))

const skeletonChangeRequired = () => {
    changeAll("[data-mk-key=qid]", state.qid);
    changeAll("[data-mk-key=len]", state.len);
    changeAll("[data-mk-key=lml]", state.lml);
    changeAll("[data-mk-key=district]", state.district);
    changeHTML("[data-mk-key=lsg-title]", `${state.len} (${state.district})`)
    changeAll()
    document.querySelector(
        "#district-link"
    ).href = `/${state.district.toLowerCase()}/`;
    document.querySelector("#lsg-link").href = `/${state.urlpath}/`;
    document.querySelector(
        "#wikidata-link"
    ).href = `https://www.wikidata.org/wiki/${state.qid}`;
};

const urlChangeRequired = () => {
    window.history.pushState({ qid: state.qid }, "", `/${state.urlpath}/`);
};

const messages = {
    enwiki: `Read more on wikipedia`,
    mlwiki: `വിക്കിപീഡിയയില്‍ കൂടുതല്‍ വായിക്കാം`,
};

const wikiChangeRequired = async () => {
    await fetchWikipediaPageByQid(state.qid);
    const wp = retrieveWikiPage(state.qid);
    if (!wp) return;

    const extracts = ["mlwiki", "enwiki"].map((wiki) => {
        if (!wp[wiki]) return;
        return `${wp[wiki].extract_html}<a target="_blank" href=${wp[wiki]?.content_urls?.desktop?.page}>${messages[wiki]}</a>`;
    });

    document.querySelector("#wikipedia").innerHTML = extracts.join("");
};

const featureSelectionButtons = document.querySelectorAll("[data-mk-feature]");
featureSelectionButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
        const feature = e.target.getAttribute("data-mk-feature");
        setFeature(feature);
    });
});

mapChangeRequired();
wikiChangeRequired();

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