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

const LAYER_GROUP_CONFIG = [
  ["Political", [
    "Boundaries",
    "Government Offices",
  ]],
  ["Emergency", [
    "Hospitals",
    "Power",
    "Police Stations",
    "Fire Stations",
  ]],
  ["Nature", [
    "Waterways/Rivers",
    "Ponds",
    "Farmlands",
  ]],
  ["Public Transport", [
    "Roads",
    "Rails",
    "Taxi",
    "Petrol Pumps",
  ]],
  ["Tourism", [
    "Hotels",
    "Restaurants",
    "Parking",
    "Cinemas",
    "Toilets",
  ]],
  ["Religous", [
    "Religion",
  ]],
  ["Education", [
    "Schools",
    "Colleges",
    "Kindergartens",
  ]],
  ["Recreation", [
    "Community centres",
    "Libraries",
  ]],
  ["Amenities", [
    "Ration shops",
    "Banks",
    "ATMs",
    "Post Offices",
    "Petrol Pumps",
    "Shops",
    "Sports",
    "Drinking Water",
    "Free WiFi",
    "Toilets",
  ]],
];

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
        id: "farmland_all",
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
      q: ``,
      id: "",
    },
    Taxi: {
      q: ``,
      id: "",
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
  Education: {
    Anganwadi: {
      q: `"amenity"="kindergarten"`,
      id: "kindergarten",
      style: {
        color: "olive",
        weight: 10,
      },
    },
    School: {
      q: `"amenity"="school"`,
      id: "school",
      style: {
        color: "olive",
        weight: 10,
      },
    },
    College: {
      q: `"amenity"~"college|university"`,
      id: "college",
      style: {
        color: "olive",
      },
    },
  },
  Bank: {
    Bank: {
      q: `"amenity"="bank"`,
      id: "bank",
    },
    ATM: {
      q: `"amenity"="atm"`,
      id: "atm",
    },
    "Post Office": {
      q: `"amenity"="post_office"`,
      id: "post_office",
    },
  },
  Religion: {
    "Place of Worship": {
      q: `"amenity"="place_of_worship"`,
      id: "place_of_worship",
    },
  },
  Power: {
    Line: {
      q: `"power"`,
      id: "power_line",
    },
    Transformer: {
      q: `"power"="transformer"`,
      id: "power_transformer",
    },
  },
  Other: {
    Drainage: {
      id: "drainage",
    },
    "Community Centres": {
      q: `"amenity"="community_centre"`,
      id: "community_centre",
    },
    Libraries: {
      q: `"amenity"="library"`,
      id: "library",
    },
    "Ration Shops": {
      q: `"name"="Ration shop"`,
      id: "ration_shop",
    },
    "Milk Cooperatives": {
      q: `"shop"="diary"`,
      id: "milk_cooperatives",
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
    "Petrol pump": {
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
