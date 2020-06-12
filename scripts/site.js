
var bluealert;
(function () {
  "use strict";


  function include(file) {
    var script  = document.createElement('script');
    script.src  = file;
    script.type = 'text/javascript';
    script.defer = true;
    document.getElementsByTagName('head').item(0).appendChild(script);
  }


console.log("loading");
  include("scripts/video.js");
  include("scripts/geolocation.js");
  include("scripts/animation.js");

      //ACCESS
      mapboxgl.accessToken = 'pk.eyJ1IjoiYW1icmlhc2hpciIsImEiOiJjaWZ0MXAybDcwZ3I2dHRseWI3NjAyMTZ2In0.eD7uxIRAY9ifI6ecnkiu-g';
      var map = new mapboxgl.Map({
        container: 'map',
        zoom: 3,
        center: [
          -94.636230,
          46.392410
        ],
        style: 'mapbox://styles/mapbox/light-v10'
      });

      //Camera


      function addMarker(m) {
        const coordinates = m.geometry.coordinates;
        const props = m.properties;
        console.log(m);
      };


      document.getElementById('camera').addEventListener('click', function() {
        fly(map,longitude,latitude);
      });

      document.getElementById('gofundme').addEventListener('click', function() {
        window.location.href = "https://www.gofundme.com";
      });


      //Load events
      map.on('load', function() {
        // Insert the layer beneath any symbol layer.
        getLocationUpdate();


        // map.addSource('earthquakes', {
        //   'type': 'geojson',
        //   'data': 'https://raw.githubusercontent.com/jdmiranda/bluealerts/master/blue.geojson',
        //   'cluster': true,
        //   'clusterProperties': {
        //     'mag1': ['+', ['case', mag1, 1, 0]],
        //     'mag2': ['+', ['case', mag2, 1, 0]],
        //     'mag3': ['+', ['case', mag3, 1, 0]],
        //     'mag4': ['+', ['case', mag4, 1, 0]],
        //     'mag5': ['+', ['case', mag5, 1, 0]]
        //   }
        // });


        // // When a click event occurs on a feature in
        // // the unclustered-point layer, open a popup at
        // // the location of the feature, with
        // // description HTML from its properties.
        // console.log("adding on click unclustered point function");
        // map.on('click', 'unclustered-point', function(e) {
        //   var coordinates = e.features[0].geometry.coordinates.slice();
        //   var mag = e.features[0].properties.quality;
        //   var stream_id = e.features[0].properties.stream_id;
        //
        //   // Ensure that if the map is zoomed out such that
        //   // multiple copies of the feature are visible, the
        //   // popup appears over the copy being pointed to.
        //   while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        //     coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        //   }

        //   console.log("adding popup");
        //
        //   new mapboxgl.Popup()
        //     .setLngLat(coordinates)
        //     .setHTML(
        //       '<iframe width="560" height=315" src="' + stream_id + '" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
        //     )
        //     .addTo(map);
        // });

        map.on('mouseenter', 'clusters', function() {
          map.getCanvas().style.cursor = 'pointer';
        });
        map.on('mouseleave', 'clusters', function() {
          map.getCanvas().style.cursor = 'pointer';
        });
      });

}());
