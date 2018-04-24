var map, infoWindow, lt, ln, range;

function initMap() {

  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 14
  });
  infoWindow = new google.maps.InfoWindow;
  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      lt = position.coords.latitude;
      ln = position.coords.longitude;
      infoWindow.setPosition(pos);
      infoWindow.setContent('You Are Here!');
      infoWindow.open(map);
      map.setCenter(pos);
      var pyrmont = new google.maps.LatLng(lt, ln);

      var request = {
        location: pyrmont,
        radius: '2500',
        query: 'restaurant'
      };

      infowindow = new google.maps.InfoWindow();
      service = new google.maps.places.PlacesService(map);
      service.textSearch(request, callback);},

    function() {
      handleLocationError(true, infoWindow, map.getCenter());});
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());}

}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
    'Error: The Geolocation service failed.' :
    'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}

function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    var x = Math.floor(Math.random() * results.length);
    createMarker(results[x]);
  }
}

function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });
  infowindow.setContent(place.name);
  $('#place').html("<h4><b>" + place.name + "</b></h4><br> <p>" + place.formatted_address + "<br><br>Rating: " + place.rating + "/5</p>");
  infowindow.open(map, marker);
  map.setCenter(place.geometry.location);
}
