
mapboxgl.accessToken = 'pk.eyJ1Ijoic2F5ZWRub29ybWQtMDYxMCIsImEiOiJjbTk1dG90b3UxNnNiMmxzOGN0aHJuMmRlIn0.I62eVPgB2LYwONdE0H0vCQ';
const map = new mapboxgl.Map({
    container: 'map', // container ID
    center: restaurant.geometry.coordinates,  
    zoom: 9 // starting zoom
})
  
const popup = new mapboxgl.Popup({ offset: 27, className: 'my-class' })
    .setHTML(`<h4>${restaurant.name}</h4> <p>Exact location will be provided</p>`)
    .setMaxWidth("300px")

const marker = new mapboxgl.Marker({ color: 'red', rotation: 45 })
    .setLngLat(restaurant.geometry.coordinates)
    .setPopup(popup) // sets a popup on this marker
    .addTo(map);



