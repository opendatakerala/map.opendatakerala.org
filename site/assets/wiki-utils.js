const wikiStore = {
    wd: {},
    wp: {},
};
const wikiReqHeaders = new Headers({
    Accept: "application/json",
    "Accept-Encoding": "gzip",
    "Content-Type": "application/json",
    "Api-User-Agent": "https://map.opendatakerala.org/about/",
    Origin: "*",
});
const WIKIDATA_API = "https://www.wikidata.org/w/api.php";
const WIKIDATA_QUERY_BASE = [
    "action=wbgetentities",
    "format=json",
    "props=sitelinks",
    "sitefilter=enwiki|mlwiki",
    "origin=*",
].join("&");

const EN_WIKI_API = "https://en.wikipedia.org/api/rest_v1";
const ML_WIKI_API = "https://ml.wikipedia.org/api/rest_v1";

const fetchWikipediaPageByQid = (qid) => {
    return fetch(`${WIKIDATA_API}?${WIKIDATA_QUERY_BASE}&ids=${qid}`, {
        headers: wikiReqHeaders,
    })
        .then((res) => res.json())
        .then((data) => {
            wikiStore.wd[qid] = data;
        })
        .then(() => hydrateWiki(qid));
};

const getAPI = (wikiname) =>
    ({ mlwiki: ML_WIKI_API, enwiki: EN_WIKI_API }[wikiname]);

const hydrateWiki = async (qid) => {
    const siteLinks = wikiStore.wd[qid].entities[qid].sitelinks;
    wikiStore.wp[qid] = {};
    const requests = [];
    ["mlwiki", "enwiki"].forEach((wiki) => {
        if (!siteLinks.hasOwnProperty(wiki)) return;
        const req = fetch(
            `${getAPI(wiki)}/page/summary/${siteLinks.mlwiki.title}?origin=*`,
            { headers: wikiReqHeaders }
        )
            .then((res) => res.json())
            .then((data) => {
                wikiStore.wp[qid][wiki] = data;
            });
        requests.push(req);
    });

    await Promise.all(requests);
};

const retrieveWikiPage = (qid) => {
    return wikiStore.wp[qid];
};

module.exports = {
    fetchWikipediaPageByQid,
    retrieveWikiPage,
};
