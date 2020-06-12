var bluealert;
(function() {
  "use strict";


  function include(file) {
    var script = document.createElement('script');
    script.src = file;
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
    style: 'mapbox://styles/mapbox/streets-v11'
  });

  //Camera

      function addSelfMarker(){
        console.log('creating self marker here');
        var marker = new mapboxgl.Marker()
            .setLngLat([longitude,latitude])
            .addTo(map);
      };

  document.getElementById('camera').addEventListener('click', function() {
    fly(map, longitude, latitude);
    addSelfMarker();
  });

  document.getElementById('gofundme').addEventListener('click', function() {
    window.location.href = "https://www.gofundme.com";
  });


  //Load events
  map.on('load', function() {
    // Insert the layer beneath any symbol layer.
    getLocationUpdate();

    map.setPaintProperty('building', 'fill-color', [
      'interpolate',
      ['exponential', 0.5],
      ['zoom'],
      15,
      '#e2714b',
      22,
      '#eee695'
    ]);

    map.setPaintProperty('building', 'fill-opacity', [
      'interpolate',
      ['exponential', 0.5],
      ['zoom'],
      15,
      0,
      22,
      1
    ]);

        var geojson = [{
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-77.031952, 38.913184]
        },
        properties: {
          icon: {
            iconUrl: 'https://www.mapbox.com/mapbox.js/assets/images/astronaut1.png',
            iconSize: [50, 50], // size of the icon
            iconAnchor: [25, 25], // point of the icon which will correspond to marker's location
            popupAnchor: [0, -25], // point from which the popup should open relative to the iconAnchor
            className: 'dot'
          }
        }
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-94.636230, 46.392410]
        },
        properties: {
          name: 'georgefloydmurder',
          icon: {
            iconUrl: 'https://www.mapbox.com/mapbox.js/assets/images/astronaut2.png',
            iconSize: [50, 50], // size of the icon
            iconAnchor: [25, 25], // point of the icon which will correspond to marker's location
            popupAnchor: [0, -25], // point from which the popup should open relative to the iconAnchor
            className: 'dot'
          }
        }
      }
    ];

geojson.forEach(addMarker);


    function addMarker(m){
      console.log(m);
      var marker = new mapboxgl.Marker()
          .setLngLat(m.geometry.coordinates)
          .addTo(map);
    };

    // map.addSource('points', {
    //   'type':'geojson',
    //   'data': geojson
    // });
    // map.addLayer('points');



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
