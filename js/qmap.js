var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 15
    });
    var geocoder = new google.maps.Geocoder();
    geocodeAddress(geocoder, map);
}


marker_dics = {};
function geocodeAddress(geocoder, resultsMap) {
    $.each(neighbor_datas, function(){  
        var neighbor_id = this.neighbor_id;
        var name = this.name;            
        var address = this.address;     
        var intro = this.intro;
        geocoder.geocode({'address': address}, function(results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                resultsMap.setCenter(results[0].geometry.location);
                var marker = new google.maps.Marker({
                    map: resultsMap,
                    position: results[0].geometry.location,
                    animation: google.maps.Animation.DROP
                });
                var contentString = 
                    '<div id="content">'+
                        '<div id="siteNotice">'+
                        '</div>'+
                            '<h1 id="firstHeading" class="firstHeading">' + name + '</h1>'+
                            '<div id="bodyContent">'+
                            '<p>' + intro + '</p>'+
                        '</div>'+
                    '</div>';
                var infowindow = new google.maps.InfoWindow({
                    content: contentString
                });
                // maker listener
                marker.addListener('click', function() {
                    infowindow.open(map, marker);
                });
                marker_dics[neighbor_id] = marker;
                // button listener
                // var btnStandford = document.getElementById(neighbor_id);
                // google.maps.event.addDomListener(btnStandford, "click", function(){
                //     google.maps.event.trigger(marker, "click");
                // });
            } else {
                alert('Geocode was not successful for the following reason: ' + status);
            }
        });
    });     
}