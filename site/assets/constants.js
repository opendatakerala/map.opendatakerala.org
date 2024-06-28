const OVERPASS_URL = "https://overpass-api.de/api/interpreter";
const KERALA_BOUNDS = [
    [7.477, 78.234],
    [13.5806, 74.2676],
];
const MIN_ZOOM = 7;

const QUERIES = {
    "Ward Boundary": '"admin_level"="10"',
    "Government Offices": `"office"="government"`,
    Hospitals: `"amenity"="hospital"`,
    Power: `"power"`,
    "Police Stations": `"amenity"="police"`,
    "Fire Stations": `"amenity"="fire_station"`,
    "Waterways/Rivers": `"waterway"`,
    Ponds: `"water"="pond"`,
    Farmlands: `"landuse"="farmland"`,
    Roads: `"highway"`,
    Rails: `"railway"`,
    Taxi: `"amenity"="taxi"`,
    "Petrol Pumps": `"amenity"="fuel"`,
    Hotels: `"tourism"="hotel"`,
    Restaurants: `"amenity"="restaurant"`,
    Parking: `"amenity"="parking"`,
    Cinemas: `"amenity"="cinema"`,
    Toilets: `"amenity"="toilets"`,
    Religion: `"amenity"="place_of_worship"`,
    Schools: `"amenity"="school"`,
    Colleges: `"amenity"="college"`,
    Kindergartens: `"amenity"="kindergarten"`,
    "Community centres": `"amenity"="community_centre"`,
    Libraries: `"amenity"="library"`,
    "Ration shops": `"name"="Ration shop"`,
    Banks: `"amenity"="bank"`,
    ATMs: `"amenity"="atm"`,
    "Post Offices": `"amenity"="post_office"`,
    Shops: `"shop"="yes"`,
    Sports: `"sport"`,
    "Drinking Water": `"amenity"="drinking_water"`,
    "Free WiFi": `"wifi"`,
};

module.exports = {
    KERALA_BOUNDS,
    MIN_ZOOM,

    OVERPASS_URL,

    QUERIES,
};
