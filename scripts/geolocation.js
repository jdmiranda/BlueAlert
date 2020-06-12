var watchID;
var geoLoc;
var latitude = 0 ;
var longitude = 0;

function showLocation(position) {
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
  console.info("Latitude : " + latitude + " Longitude: " + longitude);
}

function errorHandler(err) {
  if (err.code == 1) {
    console.error("Error: Access is denied!");
  } else if (err.code == 2) {
    console.error("Error: Position is unavailable!");
  }
}

function getLocationUpdate() {

  if (navigator.geolocation) {

    // timeout at 60000 milliseconds (60 seconds)
    var options = {
      timeout: 60000
    };
    geoLoc = navigator.geolocation;
    watchID = geoLoc.watchPosition(showLocation, errorHandler, options);
  } else {
    alert("Sorry, browser does not support geolocation!");
  }
}
