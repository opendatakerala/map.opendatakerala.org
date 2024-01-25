import { wikiStore } from "app-state";

const wikiReqHeaders = new Headers({
    Accept: "application/json",
    "Accept-Encoding": "gzip",
    "Content-Type": "application/json",
    "Api-User-Agent": "https://map.opendatakerala.org/about/",
    Origin: "*",
});


const WIKIDATA_API = "https://www.wikidata.org/w/api.php";

const wikiBaseGetEntities = ({
    ids,
    action = "wbgetentities",
    format = "json",
    props = "sitelinks",
    sitefilter = "enwiki|mlwiki",
    origin = "*"
}) => {
    const params = new URLSearchParams({ action, format, props, sitefilter, origin, ids });
    return fetch(`${WIKIDATA_API}?${params}`, { headers: wikiReqHeaders }).then(res => res.json())
}

const fetchWikiPageSummary = ({ lang = "en", title }) => {
    return fetch(
        `https://${lang}.wikipedia.org/api/rest_v1/page/summary/${title}?origin=*`,
        { headers: wikiReqHeaders }
    )
        .then(res => res.json())
}

module.exports = {
    wikiBaseGetEntities,
    fetchWikiPageSummary
};

