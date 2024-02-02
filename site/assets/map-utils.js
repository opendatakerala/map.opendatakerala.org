const osmtogeojson = require("osmtogeojson");
const L = require("leaflet");
const { QUERIES } = require("constants");
const { OVERPASS_URL } = require("constants");
const { fetchJSONWithUrlSearchParams } = require("utils");

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

/* 

We need something like: 
`(
    area["wikidata"="Q4705084"]->.a;
    (
     nwr["office"="government"](area.a);
     nwr["tourism"="hotel"](area.a);
     nwr["amenity"="school"](area.a);
    );
    (._;>;);
    relation["wikidata"="Q4705084"];
  );
  out geom;`
*/

const getMassQuery = (qid) => {
    const filters = Object.values(QUERIES).map(v => `            nwr[${v}](area.a)`).join(';\n')
    return `
[out:json] [timeout:500];
(
    area["wikidata"="${qid}"]->.a;
    (
${filters};
    );
    (._;>;);
    relation["wikidata"="${qid}"];
);
out geom;`
}

const fetchData = async (qid, feature) => {
    const query = getMassQuery(qid);

    return fetchJSONWithUrlSearchParams(OVERPASS_URL, { data: query }).then(
        (data) => {
            console.log(data);
            const geojson = osmtogeojson(data);
            return geojson;
        }
    );
};

module.exports = {
    fetchData
};
