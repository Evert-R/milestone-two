function showResults(restaurants) {
    if (restaurants == undefined) {
        logErrors('UNKNOWN_ERROR');
    }
    console.log(restaurants);
    let listItems = restaurants.map(function (restaurant) {
        console.log(restaurant);

        //let imageUri = "";
        if (restaurant.photos[0] != undefined) {
            var imageUri = restaurant.photos[0].getUrl({ "maxWidth": 600, "maxHeight": 600 });
        }
        // generate detail link

        // generate open icon
        if (restaurant.hasOwnProperty('opening_hours')) { // check if opening hours are present
            if (restaurant.opening_hours.open_now == true) { // set open now
                var openNow = `<i aria-hidden="true" class="fa fa-check er-list-icon er-open"></i><span class="sr-only">Open Now</span>`
            } else { // set closed now
                var openNow = `<i aria-hidden="true" class="fa fa-times-circle er-list-icon er-closed"></i><span class="sr-only">Closed Now</span>`
            }
        } else {
            var openNow = ``;
        }

        // generate extra detail click from the place_id
        let starRating = (restaurant.rating * 15).toFixed();
        if (restaurant.price_level != NaN) {
            var priceLevel = (restaurant.price_level * 15).toFixed();
        } else {
            var priceLevel = '0';
        }
        let infoWindow = restaurant.geometry.location;

        console.log(priceLevel);
        var expandId = restaurant.place_id.replace(/[^0-9a-z]/gi, ''); //remove unwanted characters

        // generate html list items
        return `<div class="er-list"  id="${restaurant.place_id}"> 
            <table class="er-list-table">
            <tr>
                <td class="er-cell-image">
                    <div class="er-round-image">
                        <img src="${imageUri}" alt="Restaurant photo" class="er-list-image">
                    </div>    
                </td>
                <td class="er-cell-name">
                    <div class="er-list-name">
                        <h3>${restaurant.name}</h3>
                    </div>                    
                </td>


                <td class="er-cell-rating">
                    <div class="er-rating-container" style="width:${starRating}%">
                        <img src="assets/images/Rating-Star-PNG-Transparent-Image.png" alt="rating = ${restaurant.rating} stars out of 5">
                    </div>
                    <div class="er-rating-container" style="width:${priceLevel}%">
                        <img src="assets/images/price.png"  alt="price = ${restaurant.price_level} out of 5">
                    </div>
                    
                </td>
                <td class="er-cell-open">
                    ${openNow}
                </td>          
            </tr>
        </table>
        </div>     

        <div class="er-list-collapse">
            <table class="er-list-table">
                <tr>
                    <td class="er-collapse-details" >
                    <div onclick="restaurantDetails('${restaurant.place_id}')">
                        <button>
                            <i aria-hidden="true" class="fa fa-info"></i>
                            <span class="sr-only">View restaurant details</span>
                        </button>
                    </div>
                    <div onclick="initDirectionMap('${restaurant.place_id}')">    
                        <button>
                            <i aria-hidden="true" class="fas fa-directions"></i>
                            <span class="sr-only">Get directions</span>
                        </button>
                    </div>
                        </td>
                    <td class="er-collapse-image">
                        <img src="${imageUri}" alt="Restaurant photo">
                    </td>
                </tr>
            </table>
                   
        </div>
         
                   
            
        </div>`
    });

    return `
        <div class="er-item-list">
            ${listItems.join("\n")}           
        </div>
    `
}


function restaurantDetails(place_id) { // get restaurant details and plot to screen

    //    $('html, body').animate({ scrollTop: 0 }, 'slow'); // scoll to top of the page
    var requestDetails = {
        placeId: place_id,
        fields: ['reviews', 'adr_address', 'formatted_address', 'geometry', 'icon', 'name', 'permanently_closed', 'photos', 'place_id', 'plus_code', 'type', 'url', 'utc_offset', 'vicinity']
    };

    service = new google.maps.places.PlacesService(map);
    service.getDetails(requestDetails, callback);

    function callback(place, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            console.log(place);

            // create list of photos
            let photoItems = place.photos.map(function (photo) {
                imageUri = photo.getUrl({ "maxWidth": 600, "maxHeight": 600 });
                return `<div class="col-12 er-details-photo"><img src="${imageUri}" alt="Restaurant photo"></div>`
            });
            let backGround = "url('" + place.photos[0].getUrl({ "maxWidth": 600, "maxHeight": 600 }) + ")";
            $("#er-details-section").css("background-image", backGround);


            // create place type list
            let placeTypes = place.types.map(function (placeType) {
                return `<div>${placeType}</div>`
            });

            // create adress array
            let fullAddress = place.adr_address.split(",");



            // create review section
            let reviewList = place.reviews.map(function (review, index) {
                let starRating = (review.rating * 20).toFixed();
                if (index % 2 == 0) { // mirror reviews based on even/uneven
                    return `
                    <div class="er-reviews-wrapper">
                        <table class="er-reviews-table">
                            <tr>
                                <td class="er-cell-2third">
                                    <p class="er-reviews-name">${review.author_name}</p>
                                </td>
                                <td class="er-cell-third er-review-photo">
                                    <img src="${review.profile_photo_url}" alt="Reviewers profile picture">
                                </td>

                            </tr>
                        </table>    
                        <table class="er-reviews-table">    
                            <tr>
                                <td class="er-cell-2third">
                                    <div class="er-review-text">
                                        <div>${review.text}</div>
                                    </div>
                                </td>
                                <td class="er-cell-third">
                                    <div class="er-review-rating" style="width:${starRating}px">
                                        <img src="assets/images/Rating-Star-PNG-Transparent-Image.png" alt="review-rating = ${review.rating} stars out of 5">
                                    </div>

                                    <p>${review.relative_time_description}</p>   
                                </td>
                            </tr>
                        </table>
                    </div>
                        `} else {
                    return `
                     <div class="er-reviews-wrapper">
                        <table class="er-reviews-table">
                                <tr>
                                    <td class="er-cell-2third">
                                       <p class="er-reviews-name">${review.author_name}</p>
                                    </td>
                                    <td class="er-cell-third er-review-photo">
                                            <img src="${review.profile_photo_url}" alt="Reviewers profile picture">
                                    </td>

                                </tr>
                                </table>    
                                <table class="er-reviews-table">    
                                    <tr>                                        
                                        <td class="er-cell-third">
                                            <div class="er-review-rating" style="width:${starRating}px">
                                                <img src="assets/images/Rating-Star-PNG-Transparent-Image.png" alt="review-rating = ${review.rating} stars out of 5">
                                            </div>
                                            <p>${review.relative_time_description}</p>   
                                        </td>
                                        <td class="er-cell-2third">
                                            <div class="er-review-text">
                                                <div>${review.text}</div>
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                        </div>    
                                `}

            });

            let latestRating = (place.reviews[0].rating * 20).toFixed();
            let latestReview = place.reviews[0].text.slice(0, 160) + `.....<p class="er-read-more" onclick="showReviews()">read more</p>`;
            let mainPhoto = place.photos[1].getUrl({ "maxWidth": 600, "maxHeight": 600 });
            // push details to screen
            $("#er-details").html(`
            <div class="er-details-title" onclick="showDetails()">
                <h2>${place.name}</h2>
            </div>

            <div id="er-details-main">
                <div class="er-reviews-mainwrap">
                <table class="er-reviews-table">
                    <tr>
                        <td class="er-cell-third er-review-photo">
                            <img src="${place.reviews[0].profile_photo_url}" alt="Reviewers profile picture">
                            <div class="er-review-rating" style="width:${latestRating}px">
                                <img src="assets/images/Rating-Star-PNG-Transparent-Image.png" alt="review-rating = ${place.reviews[0].rating} stars out of 5">
                            </div>
 
                        </td>
                        <td class="er-cell-2third">
                            <div class="er-review-text">
                                <div>${latestReview}</div>
                            </div>   
                        </td>
                    </tr>
                </table>
            </div>
            <div class="er-reviews-mainwrap">
                <table class="er-details-table">
                    <tr>
                        <td class="er-cell-third er-details-address">
                            ${fullAddress.join("<br>")}
                        </td>
                        <td class="er-cell-2third er-details-icons">                               
                                <button onclick="showPhotos()">
                                    <i aria-hidden="true" class="fas fa-camera-retro"></i>
                                    <span class="sr-only">Show restaurant photos</span>
                                </button>
                                <button onclick="showReviews()">
                                    <i aria-hidden="true" class="fas fa-comment"></i>
                                    <span class="sr-only">Show restaurant reviews</span>
                                </button> 
                                <button onclick="initDirectionMap('${place.place_id}')">
                                    <i aria-hidden="true" class="fas fa-directions"></i>
                                    <span class="sr-only">Get directions</span>
                                </button>                            
                        </td>
                    </tr>
                </table>
            </div>
            <div class="er-reviews-mainwrap">
                <div class="col-12 er-details-photo">
                    </div>
                </div>
            </div>
            <div id="er-details-reviews">
                <div class="er-details-title" onclick="showDetails()">
                    <h2>↓</h2>
                </div>
                    ${reviewList.join("\n")}
                </div>
                <div id="er-details-photos">
                <div class="er-details-title" onclick="showDetails()">
                    <h2>↓</h2>
                </div>
                    ${photoItems.join("\n")} 
                </div>
            `);
        } else {
            showErrors(status);
        };
        showDetails();
    }
}



function logErrors(status) {
    showError();
    console.log(status);
    if (status == 'ZERO_RESULTS') {
        $("#er-error").html(`Sorry, Nothing found.<br><br>Try adjusting your settings.<br>Then Try again<br>↓<br><button onclick="checkGeo(geoSearch)"><i aria-hidden="true" class="fab fa-sith"></i><span class="sr-only">Do a new search around you</span></button><br>or search in another city<br>↓`)
    } else if (status == 'INVALID_REQUEST') {
        $("#er-error").html(`Sorry, we don't understand.<br><br>Try a different place.`)
    } else if (status == 'OVER_QUERY_LIMIT') {
        $("#er-error").html(`Sorry, too many queries.<br><br>Please, come back a bit later.`)
    } else if (status == 'REQUEST_DENIED') {
        $("#er-error").html(`Sorry, The server denied the request.<br><br>Please, come back a bit later.`)
    } else if (status == 'UNKNOWN_ERROR') {
        $("#er-error").html(`Sorry, We don't know what happened here.<br><br>Please, come back a bit later.`)
    } else if (status == 'MAX_ROUTE_LENGTH_EXCEEDED') {
        $("#er-error").html(`Sorry, but that's way too far<br><br>to get something to eat.`)
    } else if (status == 'NOT_FOUND') {
        $("#er-error").html(`Sorry, we can't<br><br>calculate your route.`)
    } else if (status == 'INVALID_REQUEST') {
        $("#er-error").html(`Sorry, we can't<br><br>calculate your route.`)
    } else if (status == 'NOINPUT') {
        $("#er-error").html(`Where do you<br>want to eat ?`)
    } else if (status == 'NOGEO') {
        $("#er-error").html(`We can't see<br>where you are<br>Please do a<br>manual search`)
    }
};