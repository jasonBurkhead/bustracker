mapboxgl.accessToken = 'pk.eyJ1IjoiamJ1cmtoZWFkIiwiYSI6ImNsMXNnZWo5bzAyNzYzaW50MGlkY2Fyc28ifQ.lFQqBeEr74IdyxYrM7yVug'

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-71.091542,42.358862],
    zoom: 12
});
async function run(){
// get bus data    
    const locations = await getBusLocations();
    console.log(new Date());
    console.log(locations.longitude + ' ' + locations.latitude);
    //update marker
    marker.setLngLat([locations.longitude, locations.latitude])


// timer
    setTimeout(run, 15000);
}

// Request bus data from MBTA
async function getBusLocations(){
    const url = 'https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip';
    const response = await fetch(url);
    const json     = await response.json();
    return json.data[0].attributes;
}
//set base marker
let marker = new mapboxgl.Marker().setLngLat([-71.091542,42.358862]).addTo(map);

run();
