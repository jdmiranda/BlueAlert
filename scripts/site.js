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

  function addSelfMarker() {
    console.log('creating self marker here ' + longitude + ' ' + latitude);
    var marker = new mapboxgl.Marker()
      .setLngLat([longitude, latitude])
      .addTo(map);
  };

  //https://developers.google.com/web/fundamentals/media/recording-video

  var recorder = document.getElementById('camera');
  var player = document.getElementById('player');

  document.getElementById('camera').addEventListener('click', function() {
    if (latitude != 0 && longitude != 0) {
      fly(map, longitude, latitude);
      addSelfMarker();


      console.log(player);

      var handleSuccess = function(stream) {
        player.srcObject = stream;
      };

var devices;
      navigator.mediaDevices.enumerateDevices().then((devices) => {
        devices = devices.filter((d) => d.kind === 'videoinput');
      });
console.log(devices);
      navigator.mediaDevices.getUserMedia({
          audio: true,
          video: {
            deviceId: devices[0].deviceId
          }
        })
        .then(handleSuccess)
    }
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

    map.addSource('blueAlert', {
      type: 'geojson',
      // Point to GeoJSON data. This example visualizes all M1.0+ blueAlert
      // from 12/22/15 to 1/21/16 as logged by USGS' Earthquake hazards program.
      data: 'https://raw.githubusercontent.com/jdmiranda/bluealerts/master/blue.geojson',
      cluster: true,
      clusterMaxZoom: 14, // Max zoom to cluster points on
      clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
    });

    map.addLayer({
      id: 'clusters',
      type: 'circle',
      source: 'blueAlert',
      filter: ['has', 'point_count'],
      paint: {
        // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
        // with three steps to implement three types of circles:
        //   * Blue, 20px circles when point count is less than 100
        //   * Yellow, 30px circles when point count is between 100 and 750
        //   * Pink, 40px circles when point count is greater than or equal to 750
        'circle-color': [
          'step',
          ['get', 'point_count'],
          '#b81a1a',
          100,
          '#f1f075',
          750,
          '#f28cb1'
        ],
        'circle-radius': [
          'step',
          ['get', 'point_count'],
          20,
          100,
          30,
          750,
          40
        ]
      }
    });

    map.addLayer({
      id: 'cluster-count',
      type: 'symbol',
      source: 'blueAlert',
      filter: ['has', 'point_count'],
      layout: {
        'text-field': '{point_count_abbreviated}',
        'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
        'text-size': 12
      }
    });

    map.addLayer({
      id: 'unclustered-point',
      type: 'circle',
      source: 'blueAlert',
      filter: ['!', ['has', 'point_count']],
      paint: {
        'circle-color': '#b81a1a',
        'circle-radius': 4,
        'circle-stroke-width': 1,
        'circle-stroke-color': '#fff'
      }
    });

    // inspect a cluster on click
    map.on('click', 'clusters', function(e) {
      var features = map.queryRenderedFeatures(e.point, {
        layers: ['clusters']
      });
      var clusterId = features[0].properties.cluster_id;
      map.getSource('blueAlert').getClusterExpansionZoom(
        clusterId,
        function(err, zoom) {
          if (err) return;

          map.easeTo({
            center: features[0].geometry.coordinates,
            zoom: zoom
          });
        }
      );
    });

    // When a click event occurs on a feature in
    // the unclustered-point layer, open a popup at
    // the location of the feature, with
    // description HTML from its properties.
    map.on('click', 'unclustered-point', function(e) {
      var coordinates = e.features[0].geometry.coordinates.slice();
      // var mag = e.features[0].properties.mag;
      // var tsunami;
      //
      // if (e.features[0].properties.tsunami === 1) {
      //   tsunami = 'yes';
      // } else {
      //   tsunami = 'no';
      // }

      // Ensure that if the map is zoomed out such that
      // multiple copies of the feature are visible, the
      // popup appears over the copy being pointed to.
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      //sample used
      //'<iframe src="//player.vimeo.com/video/106112939" width="380" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe> <p><a href="http://vimeo.com/106112939"><h2>How Simplicity Will Save GIS</h2><p>Vladimir Agafonkin</a> from <a href="http://vimeo.com/foss4g">FOSS4G</a> on <a href="https://vimeo.com">Vimeo</a>.</p>'

      new mapboxgl.Popup()
        .setLngLat(coordinates)
        .setHTML(
          '<iframe src="' + e.features[0].properties.stream_url + '" width="380" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>' +
          '<p><a href="' + e.features[0].properties.stream_url +
          '"><h2> "' + e.features[0].properties.stream_name + '"</h2></p>'
        )
        .addTo(map);
    });

    map.on('mouseenter', 'unclustered-point', function() {
      map.getCanvas().style.cursor = 'pointer';
    });
    map.on('mouseleave', 'clusters', function() {
      map.getCanvas().style.cursor = '';
    });
  });

}());
