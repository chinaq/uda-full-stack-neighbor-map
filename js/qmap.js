
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 12
    });
    var geocoder = new google.maps.Geocoder();
    geocodeAddress(geocoder, map);
    ko.applyBindings(viewModel);
}



function geocodeAddress(geocoder, resultsMap) {
    var infowindow = new google.maps.InfoWindow();
    $.each(neighbor_datas, function(){  
        var neighbor_id = this.neighbor_id;
        var name = this.name;            
        var address = this.address;     
        var intro = this.intro;
        var yelp_id = this. yelp_id;
        geocoder.geocode({'address': address}, function(results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                resultsMap.setCenter(results[0].geometry.location);
                var marker = new google.maps.Marker({
                    map: resultsMap,
                    position: results[0].geometry.location,
                    animation: google.maps.Animation.DROP
                });
                // var infowindow = new google.maps.InfoWindow();
                // maker listener
                marker.addListener('click', function() {
                    showYelpInfo(
                        yelp_id,
                        function(yelp_intro){
                            // var y_intro = yelp_intro;
                            marker.setAnimation(google.maps.Animation.BOUNCE);
                            window.setTimeout(function() {
                                marker.setAnimation(null);                                
                            }, 3000);

                            // var infowindow = new google.maps.InfoWindow({
                            //     content:                     '<div id="content">'+
                            //         '<div id="siteNotice">'+
                            //         '</div>'+
                            //             '<h1 id="firstHeading" class="firstHeading">' + name + '</h1>'+
                            //             '<div id="bodyContent">'+
                            //             '<p>' + yelp_intro + '</p>'+
                            //         '</div>'+
                            //     '</div>'
                            // }); 
                            infowindow.setContent(
                                '<div id="content">'+
                                    '<div id="siteNotice">'+
                                    '</div>'+
                                        '<h1 id="firstHeading" class="firstHeading">' + name + '</h1>'+
                                        '<div id="bodyContent">'+
                                        '<p>' + yelp_intro + '</p>'+
                                    '</div>'+
                                '</div>'
                            ); 
                            // console.log("infowindow.content: " + infowindow.content);
                            infowindow.open(map, marker);
                            // console.log("infowindow.opened");
                        }
                    );                    
                });
                marker_dics[neighbor_id] = marker;
            } else {
                alert('Geocode was not successful for the following reason: ' + status);
            }
        });
    });     
}


function googleError() {
    alert("google map is on error.");
}

