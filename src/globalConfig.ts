

export const globalConfig = {
    // API_URL: "https://api.bridgedataoutput.com/api/v2/ODATA",
    API_URL: "https://api.mlsgrid.com/v2",
    MAP_API_URL: "https://api.mapbox.com/geocoding/v5/mapbox.places",
    MLS_ACCESS_TOKEN: process.env.MLS_ACCESS_TOKEN,  // server only
    MAPBOX_TOKEN: process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN, // client + server
  
    MAPBOX_STYLE: "mapbox://styles/mapbox/streets-v12",
    MAPBOX_STYLES: {
        STREETS: "mapbox://styles/mapbox/streets-v12",
        SATELLITE: "mapbox://styles/mapbox/satellite-v9",
        SATELLITE_STREETS: "mapbox://styles/mapbox/satellite-streets-v12",
        LIGHT: "mapbox://styles/mapbox/light-v11",
        DARK: "mapbox://styles/mapbox/dark-v11",
        NAVIGATION_DAY: "mapbox://styles/mapbox/navigation-day-v1",
        NAVIGATION_NIGHT: "mapbox://styles/mapbox/navigation-night-v1",
        OUTDOORS: "mapbox://styles/mapbox/outdoors-v12"
    },
    MAPBOX_DIRECTIONS_API: "https://api.mapbox.com/directions/v5/mapbox"
};


console.log(globalConfig.MLS_ACCESS_TOKEN)
console.log(globalConfig.MAPBOX_TOKEN)

export const RouteNames = {
    Home: "/",
    Properties: "/properties",
    PropertyDetail: "/properties/:id",
}