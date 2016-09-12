'use strict';

var googleMap = {};

googleMap.mapSetup = function () {
  var canvas = document.getElementById('map-canvas');

  var mapOptions = {
    zoom: 12,
    center: new google.maps.LatLng(51.506178, -0.088369),
    mapType: google.maps.MapTypeId.ROADMAP
  };

  //this line generates the map
  this.map = new google.maps.Map(canvas, mapOptions);

  this.getBikePoints();
};

googleMap.getBikePoints = function () {
  return $.get("http://localhost:3000/bikes").done(this.loopThroughBikes);
};

googleMap.loopThroughBikes = function (data) {
  console.log(data);
  return $.each(data, function (index, data) {

    googleMap.createMarkerForBike(data);
  });
};

googleMap.addInfoWindowForBike = function (data, marker) {
  var _this = this;

  //event listener on marker using google object

  google.maps.event.addListener(marker, 'click', function () {
    if (typeof _this.infoWindow != "undefined") _this.infoWindow.close();

    _this.infoWindow = new google.maps.InfoWindow({
      content: '<p>' + data.name + '</p>'
    });

    _this.infoWindow.open(_this.map, marker);
    _this.map.setCenter(marker.getPosition());
  });
};

googleMap.createMarkerForBike = function (data) {
  var latLng = new google.maps.LatLng(data.lat, data.lon);
  var marker = new google.maps.Marker({
    position: latLng,
    map: this.map
  });
  this.addInfoWindowForBike(data, marker);
};

$(googleMap.mapSetup.bind(googleMap));