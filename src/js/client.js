(function(globals) {
  "use strict";

  if (!('App' in globals)) {
    globals.App = {};
  }

  globals.App.mapSetup = function() {
    let canvas = document.getElementById('map-canvas');

    let mapOptions = {
      zoom: 13,
      center: new google.maps.LatLng(51.506178, -0.088369),
      mapType: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: true,
      mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
        position: google.maps.ControlPosition.LEFT_TOP
      },
      zoomControl: true,
      zoomControlOptions: {
        position: google.maps.ControlPosition.RIGHT_TOP
      },
      scaleControl: true,

      styles: [{
        "featureType": "administrative",
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#444444"
        }]
      }, {
        "featureType": "administrative.land_parcel",
        "elementType": "all",
        "stylers": [{
          "visibility": "off"
        }]
      }, {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [{
          "color": "#f2f2f2"
        }]
      }, {
        "featureType": "landscape.natural",
        "elementType": "all",
        "stylers": [{
          "visibility": "off"
        }]
      }, {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [{
          "visibility": "on"
        }, {
          "color": "#052366"
        }, {
          "saturation": "-70"
        }, {
          "lightness": "85"
        }]
      }, {
        "featureType": "poi",
        "elementType": "geometry.fill",
        "stylers": [{
          "saturation": "-100"
        }, {
          "lightness": "0"
        }]
      }, {
        "featureType": "poi",
        "elementType": "labels",
        "stylers": [{
          "visibility": "simplified"
        }, {
          "lightness": "-53"
        }, {
          "weight": "1.00"
        }, {
          "gamma": "0.98"
        }]
      }, {
        "featureType": "poi",
        "elementType": "labels.text",
        "stylers": [{
          "visibility": "off"
        }]
      }, {
        "featureType": "poi",
        "elementType": "labels.icon",
        "stylers": [{
          "visibility": "off"
        }, {
          "lightness": "0"
        }]
      }, {
        "featureType": "poi.park",
        "elementType": "geometry.fill",
        "stylers": [{
          "hue": "#3dff00"
        }, {
          "saturation": "-100"
        }]
      }, {
        "featureType": "road",
        "elementType": "all",
        "stylers": [{
          "saturation": -100
        }, {
          "lightness": 45
        }, {
          "visibility": "on"
        }]
      }, {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [{
          "saturation": "-18"
        }]
      }, {
        "featureType": "road",
        "elementType": "labels",
        "stylers": [{
          "visibility": "off"
        }]
      }, {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [{
          "visibility": "on"
        }]
      }, {
        "featureType": "road.arterial",
        "elementType": "all",
        "stylers": [{
          "visibility": "on"
        }]
      }, {
        "featureType": "road.arterial",
        "elementType": "labels.icon",
        "stylers": [{
          "visibility": "off"
        }]
      }, {
        "featureType": "road.local",
        "elementType": "all",
        "stylers": [{
          "visibility": "on"
        }]
      }, {
        "featureType": "road.local",
        "elementType": "labels.text",
        "stylers": [{
          "visibility": "off"
        }]
      }, {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [{
          "visibility": "off"
        }]
      }, {
        "featureType": "water",
        "elementType": "all",
        "stylers": [{
          "color": "#57677a"
        }, {
          "visibility": "on"
        }]
      }, {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [{
          "lightness": "40"
        }]
      }]
    };

    //this line generates the map
    this.map = new google.maps.Map(canvas, mapOptions);

    // this.getBikePoints();
  };


  globals.App.getCurrentLocation = function() {
    navigator.geolocation.getCurrentPosition(function(position) {
      let marker = new google.maps.Marker({
        position: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
        map: globals.App.map,
        icon: {
          url: "/images/markerred.png",
          scaledSize: new google.maps.Size(21, 21),
        }
      });

      globals.App.map.setCenter(marker.getPosition());
      console.log("The User's Position is: " + marker.getPosition());
    });
  };

  globals.App.redrawMap = function() {
    globals.App.emptyMap();
    return $.get("https://salamanderbikes.herokuapp.com/bikes").done(
      function(data) {

        globals.App.loopThroughBikes(data);
      }
    );
  };


  globals.App.getBikePoints = function() {
    // return $.get("http://localhost:3000/bikes").done(this.loopThroughBikes);
    return $.get("https://salamanderbikes.herokuapp.com/bikes").done(this.loopThroughBikes);
  };

  // globals.App.getDockPoints = function() {
  //   return $.get("http://localhost:3000/bikes").done(this.loopThroughDocks);
  // };



  globals.App.loopThroughBikes = function(data) {
    return $.each(data, (index, data) => {
      globals.App.createMarker(data);
    });
  };

  globals.App.loopThroughDocks = function(data) {
    return $.each(data, (index, data) => {
      globals.App.createMarkerForDock(data);
    });
  };


  globals.App.addInfoWindowForBike = function(data, marker) {
    //event listener on marker using google object

    google.maps.event.addListener(marker, 'click', () => {
      if (typeof this.infoWindow != "undefined") this.infoWindow.close();

      this.infoWindow = new google.maps.InfoWindow({
        content: `<div><p id="bikeLocation" style="color: #696969"><strong>Location:</strong> ${ data.name }</p><p id="bikesAvailable" style="color: #696969"><strong>Bikes Available: </strong>${ data.NbBikes}</p>
        <p id="emptyDocks" style="color: #696969"><strong>Empty Docks:</strong> ${ data.NbEmptyDocks}</p>
        </div>`
      });

      this.infoWindow.open(this.map, marker);
      this.map.setCenter(marker.getPosition());
    });
  };


  globals.App.createMarker = function(data) {

    let radius = 0;
    let url = "";


    if (this.whichMarker === "NbBikes") {
      radius = Math.sqrt(data.NbBikes) * 3.5;
      url = "/images/markerpurple.png";
    } else {
      radius = Math.sqrt(data.NbEmptyDocks) * 3;
      url = "/images/markerblue2.png";
    }

    // let sizeBikes = Math.sqrt(data.NbBikes) * 3.5;
    // let sizeDocks = Math.sqrt(data.NbEmptyDocks) * 3;
    // if(data.NbBikes < 3){
    //   size = 8;
    // } else {
    //   size= 14;
    // }


    let latLng = new google.maps.LatLng(data.lat, data.lon);

    let marker = new google.maps.Marker({
      position: latLng,
      map: this.map,
      icon: {
        url: url,
        scaledSize: new google.maps.Size(radius, radius)
      }
    });
    this.addInfoWindowForBike(data, marker);
  };


  $(globals.App.mapSetup.bind(globals.App));

}(window));