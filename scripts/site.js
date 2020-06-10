var village;
(function () {
  "use strict";

  console.log('test');
  L.mapbox.accessToken = 'pk.eyJ1IjoiYW1icmlhc2hpciIsImEiOiJjaWZ0MXAybDcwZ3I2dHRseWI3NjAyMTZ2In0.eD7uxIRAY9ifI6ecnkiu-g';
  var map = new L.mapbox.Map();
  map.addControl(new L.mapbox.NavigationControl());
  json = $.getJSON('http://raw.githubusercontent.comjdmiranda/bluealerts/testinglinks/blue.json')
  var markers = new L.MarkerClusterGroup();


  function processJsonGroups(data) {
    data.forEach(addMarker);
    map.addLayer(markers);
  };

  function addMarker(m) {
    const coordinates = m.geometry.coordinates;
    const props = m.properties;
    console.log(m);
  };


});
