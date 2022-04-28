// Initialize the map.
let map;
let geocoder;
let infowindow;
var searchButton = document.getElementById("searchButton");
searchButton.addEventListener("click", function() {
    var searchText = document.getElementById("searchText").value;
    console.log(searchText);
    lookupLocation(searchText);
    //geocodeAddress(searchText);
});

function getPlaceData() {
    // create a reference the search text

    // get the search text
    // pass the search text to the lookup location
    var input = getElementById("mapsearch");
    t.input.textcontent.addEventListener("onclick");
    prompt(lookupLocation);
}

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 8,
        center: {
            lat: 40.72,
            lng: -73.96,
        },
    });
    geocoder = new google.maps.Geocoder();
    infowindow = new google.maps.InfoWindow();
}

function lookupLocation(location) {
    var requestOptions = {
        method: "GET",
        mode: "no-cors",
    };
    fetch(
            `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${location}&types=establishment&location=37.76999%2C-122.44696&radius=500&key=AIzaSyCr-Av0kS8QAYgzV2dOHJXomDn8rxTcsRA`
        )
        .then((response) => response.json())
        .then((result) => getPlaceId(result));
}

function getPlaceId(result) {
    console.log(result);
    var placeId = result.predictions[0].place_id;
    geocodePlaceId(placeId);
}

function geocodePlaceId(placeId) {
    geocoder
        .geocode({
            placeId: placeId,
        })
        .then(({ results }) => {
            if (results[0]) {
                map.setZoom(11);
                map.setCenter(results[0].geometry.location);
                const marker = new google.maps.Marker({
                    map,
                    position: results[0].geometry.location,
                });
                infowindow.setContent(results[0].formatted_address);
                infowindow.open(map, marker);
            } else {
                window.alert("No results found");
            }
        })
        .catch((e) => window.alert("Geocoder failed due to: " + e));
}
window.initMap = initMap;