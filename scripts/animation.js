function fly(map,lon,lat){
  map.flyTo({
    center: [
      lon,
      lat
    ],
    zoom: 13,
    essential: true //this animation is considered essential with respect to preferes-reduced-motion
  });
};
