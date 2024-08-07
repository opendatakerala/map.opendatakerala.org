const { fetchData, getShapedGeoJSON } = require("map-utils");

const { isEmptyObject, startJSONDownload } = require('./utils');

const { replaceOverlay } = require('./leaflet-manager');

const { wikiBaseGetEntities, fetchWikiPageSummary } = require('./wiki-utils');

import { WikiData } from './components/WikiData';
import { WikiPedia } from './components/WikiPedia';
import { setupSearch, getLsgFromPath } from './search';

const mapChangeRequired = async (config) => {
    return replaceOverlay(config);
};

setupSearch("#search", (lsg) => {
    maybeRespond({ lsg: lsg.target });
});

const maybeRespond = ({ lsg, ...params }) => {
    changeURL({ lsg, ...params });
}

const changeURL = ({ lsg, ...params }) => {
    const config = new URLSearchParams(params);
    const target = `${lsg}?${config}`
    history.pushState(undefined, undefined, target);
    reconfigure(target);
}

const shellChangeRequired = async (lsg) => {
    document.querySelectorAll('[data-mk-key=lsg-title]').forEach(el => el.textContent = lsg.len)
    document.querySelector('wiki-data').setAttribute('qid', lsg.qid);
}

let currentPath = '';

const reconfigure = async (configString) => {
    const url = new URL(configString, 'https://map.opendatakerala.org');
    const newPath = url.pathname;
    const lsg = await getLsgFromPath(newPath) || {qid: "Q1186", len: "Kerala"};
    const urlSearchParams = new URLSearchParams(window.location.search);
    const config = Object.fromEntries(urlSearchParams.entries());
    const feature = config.feature || "Boundaries"
    mapChangeRequired({ qid: lsg.qid, feature, lsg })
    shellChangeRequired(lsg)

}

window.addEventListener('popstate', (event) => {
    reconfigure(location.href);
})

reconfigure(location.href);

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


const driverObj = driver.js.driver();
driverObj.highlight({
    element: "#search",
    popover: {
        title: "Find your LSG",
        description: "Enter the name of the panchayat/municipality/corporation you are searching for"
    }
})

document.getElementById("search").addEventListener('click', (e) => driverObj.destroy())
document.getElementById("search").addEventListener('input', (e) => driverObj.destroy())
setTimeout(() => driverObj.destroy(), 10000)