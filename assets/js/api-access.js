function mapOptions() { // style options for all maps
    return {
        disableDefaultUI: true,
        styles: [
            {
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#ebe3cd"
                    }
                ]
            },
            {
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#523735"
                    }
                ]
            },
            {
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#f5f1e6"
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#c9b2a6"
                    }
                ]
            },
            {
                "featureType": "administrative.land_parcel",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#dcd2be"
                    }
                ]
            },
            {
                "featureType": "administrative.land_parcel",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#ae9e90"
                    }
                ]
            },
            {
                "featureType": "landscape.natural",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#dfd2ae"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#dfd2ae"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#93817c"
                    }
                ]
            },
            {
                "featureType": "poi.attraction",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi.business",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi.business",
                "elementType": "labels",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi.government",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#a5b076"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#447530"
                    }
                ]
            },
            {
                "featureType": "poi.place_of_worship",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi.school",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi.sports_complex",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#f5f1e6"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#fdfcf8"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#f8c967"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#e9bc62"
                    }
                ]
            },
            {
                "featureType": "road.highway.controlled_access",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#e98d58"
                    }
                ]
            },
            {
                "featureType": "road.highway.controlled_access",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#db8555"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#806b63"
                    }
                ]
            },
            {
                "featureType": "transit.line",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#dfd2ae"
                    }
                ]
            },
            {
                "featureType": "transit.line",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#8f7d77"
                    }
                ]
            },
            {
                "featureType": "transit.line",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#ebe3cd"
                    }
                ]
            },
            {
                "featureType": "transit.station",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#dfd2ae"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#b9d3c2"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#92998d"
                    }
                ]
            }
        ]
    }
}

function initMap(currentLat, currentLong) {
    showMap(); //show map so the markers can fit the bounds    
    map = new google.maps.Map(document.getElementById('map'), mapOptions()); // Create the map.
};

function getRadius() { // get sort method from options
    console.log($("#er-radius").val())
    return $("#er-radius").val()
}

function getCuisine() { // get cuisine type from options
    var cuisine = $("#er-cuisine").children("option:selected").val()
    if (cuisine != '') {
        return ` AND (${cuisine})`;
    } else {
        return '';
    }
}

function getVehicle() {
    return $("input[name='er-travel']:checked").val()
}

function getVeg() { // get veg options from settings
    var vegOptions = '';
    var vegan = '';
    var gluten = '';
    if ($("#vegan").is(":checked")) {
        vegan = ` AND (vegan)`;
    }
    if ($("#gluten").is(":checked")) {
        gluten = ` AND (gluten-free)`;
    }
    vegOptions = vegan + gluten;
    return vegOptions;
}

function getOpen() { // get only open option from settings
    if ($("#open-now").is(":checked")) {
        return true;
    }
}

function checkGeo(callback, directions) { // get current location
    navigator.geolocation.getCurrentPosition(function (position) {
        callback(position.coords.latitude, position.coords.longitude);
    },
        function (error) { // if location denied show error
            if (error.code == error.PERMISSION_DENIED && directions != undefined) {
                logErrors('NOGEO')
            } else { // if we wanted directions do a browser search in new tab
                console.log('directions via browser')
            }
        }
    )
};

function geoSearch(currentLat, currentLong) {
    // assign the more button
    var getNextPage = null;
    var moreButton = document.getElementById('more');
    moreButton.onclick = function () {
        console.log()
        moreButton.disabled = true;
        if (getNextPage) getNextPage();
    };

    initMap();
    // Create the places service
    var service = new google.maps.places.PlacesService(map);
    // Perform a nearby search.
    service.nearbySearch(
        {
            location: { lat: currentLat, lng: currentLong },
            radius: getRadius(),
            type: ['restaurant'],
            keyword: ['vegetarian' + getVeg() + getCuisine()],
            openNow: getOpen(),
            //          rankBy: google.maps.places.RankBy.DISTANCE
        },
        function (results, status, pagination) {
            console.log(status);
            if (status !== 'OK') {
                logErrors(status);
                return;
            }
            // push results to screen
            $("#er-search-results").html(showResults(results));
            console.log(results)
            createMarkers(results) // Plot markers on the map
            setTimeout(function () { // wait a bit to show the mapresults
                showList(collapse('collapsible')); // then show list
            }, 2500);
            // next page assignment
            moreButton.disabled = !pagination.hasNextPage;
            getNextPage = pagination.hasNextPage && function () {
                pagination.nextPage();
            };

        });
}



function manualSearch() {
    // assign the more button
    var getNextPage = null;
    var moreButton = document.getElementById('more');
    moreButton.onclick = function () {
        moreButton.disabled = true;
        if (getNextPage) getNextPage();
    };

    initMap();
    // Create the places service :
    var service = new google.maps.places.PlacesService(map);
    //get search input
    var searchInput = document.getElementById("er-search-input").value;

    if (searchInput == '') { // Nothing entered? error
        logErrors('NOINPUT');
        return;
    };
    // Perform the manual search :
    service.textSearch(
        {
            query: searchInput + ' AND vegetarian' + getCuisine() + getVeg(),
            type: ['restaurant'],
            openNow: getOpen()
        },
        function (results, status, pagination) {
            if (status !== 'OK') {
                logErrors(status);
                return;
            }
            // push results to screen
            $("#er-search-results").html(showResults(results)); // push details to screen
            console.log(results);
            createMarkers(results) // Plot markers on the map
            setTimeout(function () { // wait a bit to show the mapresults
                showList(collapse('collapsible')); // then show the resultslist
            }, 2500);
            // next page assignment
            moreButton.disabled = !pagination.hasNextPage;
            getNextPage = pagination.hasNextPage && function () {
                pagination.nextPage();
            };
        }
    );
};

function createMarkers(places) { // plot markers to the map
    var bounds = new google.maps.LatLngBounds();
    var infowindow = new google.maps.InfoWindow({
        content: ''
    });

    for (let index = 0, place; place = places[index]; index++) {
        let image = {
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(25, 25)
        };
        let marker = new google.maps.Marker({
            map: map,
            //  label: place.name,
            position: place.geometry.location

        });
        infoContent = place.name; //   create infowwindow content
        google.maps.event.addListener(marker, 'click', (function (marker, infoContent, infowindow) {
            return function () {
                infowindow.close()
                infowindow.setContent(infoContent);
                infowindow.open(map, marker);
            };
        })(marker, infoContent, infowindow));
        bounds.extend(place.geometry.location);
    };
    map.fitBounds(bounds);
};



function initDirectionMap(placeId) {
    checkGeo(function (currentLat, currentLong) {
        if (typeof currentLat !== 'undefined' && typeof currentLong !== 'undefined') {
            calcRoute(placeId, currentLat, currentLong);
        } else {
            showList();
        }
    });
    console.log(placeId);
}

function calcRoute(placeId, currentLat, currentLong) {
    showDirections(); // show directions section
    var directionsService = new google.maps.DirectionsService();
    var directionsRenderer = new google.maps.DirectionsRenderer();
    var chicago = new google.maps.LatLng(currentLat, currentLong);

    var directionMap = new google.maps.Map(document.getElementById('direction-map'), mapOptions());
    directionsRenderer.setMap(directionMap);
    console.log(placeId);

    var start = `{location: {lat:${currentLat}, lng:${currentLong}}}`;
    var end = `{place_id: "${placeId}"}`;
    var request = {
        origin: { lat: currentLat, lng: currentLong },
        destination: { 'placeId': placeId },
        travelMode: getVehicle()
    };
    console.log(request);
    directionsService.route(request, function (result, status) {
        if (status !== 'OK') {
            logErrors(status);
            return;
        }
        directionsRenderer.setDirections(result);

    });
}




var map; // create map variable

// checkGeo(initMap); // check location, if present do geo search
// jsonMap();


function jsonMap() {

    $.when(
        $.get(`assets/data/leiden.json`)
    ).then(
        // make variable of data
        function (response) {
            var searchResults = response;



            // push searchResults to div

            $("#er-search-results").html(showResults(searchResults))


            collapse()

        },
        // error handling
        function (errorResponse) {
            if (errorResponse.status === 404) {
                $("#er-api-data").html(
                    `<h2>No info found for leiden</h2>`);


            } else if (errorResponse.status === 403) {
                var resetTime = new Date(errorResponse.getResponseHeader('X-RateLimit-Reset') * 1000);
                $("#er-api-data").html(`<h4>Too many requests, please wait until ${resetTime.toLocaleTimeString()}</h4>`);
            } else {
                console.log(errorResponse);
                $("#er-api-data").html(
                    `<h2>Error: ${errorResponse.responseJSON.message}</h2>`);
            };

        });

};