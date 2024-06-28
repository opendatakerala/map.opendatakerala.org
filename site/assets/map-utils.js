const osmtogeojson = require("osmtogeojson");
const L = require("leaflet");
const { QUERIES } = require("constants");
const { OVERPASS_URL } = require("constants");
const { fetchJSONWithUrlSearchParams } = require("utils");

const getQuery = (qid, feature) => {
  if (feature === "Boundaries") {
    return `[out:json] [timeout:500];
                 relation[wikidata=${qid}];
                 out geom;`;
  }
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
  const filters = Object.values(QUERIES).map((v) =>
    `            nwr[${v}](area.a)`
  ).join(";\n");
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
out geom;`;
};

const fetchData = async (qid, feature) => {
  let query;
  if (feature) {
    query = getQuery(qid, feature);
  } else {
    query = getMassQuery(qid);
  }
  return fetchJSONWithUrlSearchParams(OVERPASS_URL, { data: query });
};

const grouper = (item) => {
  const amenity = item?.properties?.amenity;
  if (amenity) return amenity;
  return "NOT_AMENITY";
};

const getSkeletonGeoJSON = () => {
  return ({
    "type": "FeatureCollection",
    "features": [],
  });
};

const CONFIGURATION = {
  Political: {
    "Boundaries": {
      q: `relation[wikidata=Q13113332]`,
      id: "panchayat_boundary",
      active: true,
      style: {
        color: "#000",
        weight: 4,
        dashArray: "6 2 6",
        fillOpacity: 0,
      },
    },
    "Ward Boundary": {
      q: `"admin_level"="10"`,
      id: "wards",
      active: true,
      style: {
        color: "#222",
        weight: 2,
        dashArray: "4 1 4",
        fillOpacity: 0,
      },
  },
    "Government Offices": {
      q: `"admin_level"="10"`,
      id: "wards",
      active: true,
      style: {
        color: "#222",
        weight: 2,
        dashArray: "4 1 4",
        fillOpacity: 0,
      },
    },
  },
  Emergency: {
    "Police Stations": {
      q: `"amenity"="police"`,
      id: "police",
      style: {
        weight: 10,
        color: "red",
      },
    },
    "Fire Stations": {
      q: `"amenity"="fire_station"`,
      id: "fire",
      style: {
        weight: 10,
        color: "red",
      },
    },
    Hospitals: {
      q: `"amenity"="hospital"`,
      id: "hospital",
      style: {
        weight: 10,
      },
    },
    Power: {
      q: `"power"`,
      id: "power_line",
    },
    
  },
  Nature: {
    "Waterways/Rivers": {
      q: `"waterway"`,
      id: "rivers",
    },
    Ponds: {
      q: `"water"="pond"`,
      id: "ponds",
    },
    "Farmlands": {
        q: `"landuse"="farmland"`,
        id: "farmland_rice",
        style: {
          color: "green",
        },
      },
  },
  "Public Transport": {
    Rails: {
      q: `"railway"`,
      id: "railway",
      style: {
        color: "#333",
        lineCap: "butt",
        weight: 5,
        dashArray: "2",
        fillOpacity: 0,
      },
    },
    Roads: {
      q: `"highway"="trunk"`,
      id: "nh",
      style: {
        color: "#f9b29c",
        weight: 5,
      },
    },
    "Petrol Pumps": {
      q: `"amenity"="fuel"`,
      id: "petrol_pump",
    },
    Taxi: {
      q: `"amenity"="taxi"`,
      id: "taxi",
    },
  },
  Tourism: {
    Hotels: {
      id: "hotels"
    },
    Restaurants: {
      id: "restaurants"
    },
    Parking: {
      id: "parking"
    },
    Cinemas: {
      id: "cinemas"
    },
    Toilets: {
      id: "toilets"
    },
  },
  Religious: {
    "Place of Worship": {
      q: `"amenity"="place_of_worship"`,
      id: "place_of_worship",
    },
  },
  Education: {
    Kindergartens: {
      q: `"amenity"="kindergarten"`,
      id: "kindergarten",
      style: {
        color: "olive",
        weight: 10,
      },
    },
    Schools: {
      q: `"amenity"="school"`,
      id: "school",
      style: {
        color: "olive",
        weight: 10,
      },
    },
    Colleges: {
      q: `"amenity"~"college|university"`,
      id: "college",
      style: {
        color: "olive",
      },
    },
  },
  Health: {
    PHCs: {
      q: ``,
      id: "",
    },
    Hospitals: {
      q: `"amenity"="hospital"`,
      id: "hospital",
      style: {
        weight: 10,
      },
    },
    Clinics: {
      q: `"amenity"="clinic"`,
      id: "clinic",
      style: {
        weight: 10,
      },
    },
    Vet: {
      q: ``,
      id: "",
    },
  },
  Recreation: {
    "Community centres": {
      q: `"amenity"="community_centre"`,
      id: "community_centre",
    },
    Libraries: {
      q: `"amenity"="library"`,
      id: "library",
    },
  },
  Amenities: {
    Banks: {
      q: `"amenity"="bank"`,
      id: "bank",
    },
    ATMs: {
      q: `"amenity"="atm"`,
      id: "atm",
    },
    "Post Offices": {
      q: `"amenity"="post_office"`,
      id: "post_office",
    },
    "Ration Shops": {
      q: `"name"="Ration shop"`,
      id: "ration_shop",
    },
    Toilets: {
      q: `"amenity"="toilets"`,
      id: "toilets",
    },
    "Free WiFi": {
      q: `"wifi"`,
      id: "wifi",
    },
    "Drinking Water": {
      q: ``,
      id: "",
    },
    Sport: {
      q: `"sport"`,
      id: "sport",
    },
    "Petrol Pumps": {
      q: `"amenity"="fuel"`,
      id: "petrol_pump",
    },
  },
};

const getInitialLayers = () => {
};

const getShapedGeoJSON = (data) => {
  const geoj = osmtogeojson(data);
  const groupedFeatures = Object.groupBy(geoj.features, grouper);
  return Object.entries(groupedFeatures).map(([k, v]) => {
    const skeleton = getSkeletonGeoJSON();
    skeleton.features = v;
    return skeleton;
  });
};


const geojsonMarkerOptions = {
    radius: 1,
    fillColor: "blue",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};


const defaultStyle = {
  color: "blue",
  weight: 4,
};

const getOverlays = () => {
  overlays = Object.keys(CONFIGURATION).map((group) => {
    return {
      group,
      layers: Object.keys(CONFIGURATION[group]).map((amenity) => {
        const layerName = CONFIGURATION[group][amenity];
        const { id, active, style } = CONFIGURATION[group][amenity];
        if (id === "") return undefined;
        return {
          name: amenity,
          active,
          layer: L.geoJson(undefined, {
            style: style || defaultStyle,
            // onEachFeature: onEachFeature,
            pointToLayer: function (feature, latlng) {
              return L.circleMarker(latlng, geojsonMarkerOptions);
            },
          }),
          icon:
            `<img src="/icons/${id}.png" onerror="this.onerror=null;this.src='icons/blank.png';"></img>`,
        };
      }).filter((am) => am !== undefined),
    };
  });
  return overlays;
};

module.exports = {
  fetchData,
  getShapedGeoJSON,
  getOverlays,
};
