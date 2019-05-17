// Creating map object
var map = L.map("map", {
    center: [37.733795, -122.446747],
    zoom: 5
  });
  
  // Adding tile layer
  L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.light",
    accessToken: API_KEY
  }).addTo(map);
  
  var link = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson'
  
  // Grabbing our GeoJSON data..
 
    // Creating a GeoJSON layer with the retrieved data

    function getColor(d) {
        return d > 9 ? '#FF2300' :  
            d > 8 ? '#FF5700' :
                d > 7 ? '#FF8C00' :
                    d > 6 ? '#FFC100' :
                        d > 5 ? '#FFF600' :
                            d > 4 ? '#D4FF00' :
                                d > 3 ? '#9FFF00' :
                                    d > 2 ? '#6AFF00' :
                                        d > 1 ? '#35FF00' :
                                            '#00FF00';
    }
  
  
 

d3.json(link, function(data) {

L.geoJSON(data, {
    pointToLayer: function (feature, latlng) {
        var geojsonMarkerOptions = {
            radius: Math.round(feature.properties.mag) * 3,
            fillColor: getColor(feature.properties.mag),
            color: "#000",
            weight: 1,
            opacity: 1,
            fillOpacity: 1
        };
        return L.circleMarker(latlng, geojsonMarkerOptions);
        
    }
}).addTo(map);
});

var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
        '<i style="background:' + getColor(grades[i]) + '"></i> ' +
        grades[i] + '<br>';
    }

    return div;
};

legend.addTo(map);