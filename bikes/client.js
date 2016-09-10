const googleMap = {};


googleMap.mapSetup = function() {
  let canvas = document.getElementById('map-canvas');

  let mapOptions = {
    zoom: 12,
    center: new google.maps.LatLng(51.506178,-0.088369),
    mapType: google.maps.MapTypeId.ROADMAP
  };

  //this line generates the map
  this.map = new google.maps.Map(canvas, mapOptions);

  this.getBikePoints();
};


googleMap.getBikePoints = function() {
  return $.get("http://localhost:3000/bikes").done(this.loopThroughBikes);
};

googleMap.loopThroughBikes = function(data) {
  console.log(data);
  return $.each(data, (index, data) => {
    setTimeout(() => {
      googleMap.createMarkerForBike(data);
    }, index * 100);
  });

};

googleMap.addInfoWindowForBike = function(data, marker) {
  //event listener on marker using google object

  google.maps.event.addListener(marker, 'click', () => {
    if(typeof this.infoWindow != "undefined") this.infoWindow.close();

    this.infoWindow = new google.maps.InfoWindow({
      content:`<p>${ data.name }</p>`
    });

    this.infoWindow.open(this.map, marker);
    this.map.setCenter(marker.getPosition());
  });
};


googleMap.createMarkerForBike = function(data) {
  let latLng = new google.maps.LatLng(data.lat,data.lon);
  let marker = new google.maps.Marker({
    position: latLng,
    map: this.map,
    animation: google.maps.Animation.DROP,
  });
  this.addInfoWindowForBike(data, marker);
};



$(googleMap.mapSetup.bind(googleMap));
