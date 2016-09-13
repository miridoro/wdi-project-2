(function(globals){
  "use strict";

  if (!('App' in globals)) { globals.App = {}; }


  globals.App.mapSetup = function() {
    let canvas = document.getElementById('map-canvas');

    let mapOptions = {
      zoom: 12,
      center: new google.maps.LatLng(51.506178,-0.088369),
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

      styles: [
      {
          "featureType": "administrative",
          "elementType": "labels.text.fill",
          "stylers": [
              {
                  "color": "#444444"
              }
          ]
      },
      {
          "featureType": "administrative.land_parcel",
          "elementType": "all",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "landscape",
          "elementType": "all",
          "stylers": [
              {
                  "color": "#f2f2f2"
              }
          ]
      },
      {
          "featureType": "landscape.natural",
          "elementType": "all",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "poi",
          "elementType": "all",
          "stylers": [
              {
                  "visibility": "on"
              },
              {
                  "color": "#052366"
              },
              {
                  "saturation": "-70"
              },
              {
                  "lightness": "85"
              }
          ]
      },
      {
          "featureType": "poi",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "saturation": "-100"
              },
              {
                  "lightness": "0"
              }
          ]
      },
      {
          "featureType": "poi",
          "elementType": "labels",
          "stylers": [
              {
                  "visibility": "simplified"
              },
              {
                  "lightness": "-53"
              },
              {
                  "weight": "1.00"
              },
              {
                  "gamma": "0.98"
              }
          ]
      },
      {
          "featureType": "poi",
          "elementType": "labels.text",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "poi",
          "elementType": "labels.icon",
          "stylers": [
              {
                  "visibility": "off"
              },
              {
                  "lightness": "0"
              }
          ]
      },
      {
          "featureType": "poi.park",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "hue": "#3dff00"
              },
              {
                  "saturation": "-100"
              }
          ]
      },
      {
          "featureType": "road",
          "elementType": "all",
          "stylers": [
              {
                  "saturation": -100
              },
              {
                  "lightness": 45
              },
              {
                  "visibility": "on"
              }
          ]
      },
      {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [
              {
                  "saturation": "-18"
              }
          ]
      },
      {
          "featureType": "road",
          "elementType": "labels",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "road.highway",
          "elementType": "all",
          "stylers": [
              {
                  "visibility": "on"
              }
          ]
      },
      {
          "featureType": "road.arterial",
          "elementType": "all",
          "stylers": [
              {
                  "visibility": "on"
              }
          ]
      },
      {
          "featureType": "road.arterial",
          "elementType": "labels.icon",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "road.local",
          "elementType": "all",
          "stylers": [
              {
                  "visibility": "on"
              }
          ]
      },
      {
          "featureType": "road.local",
          "elementType": "labels.text",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "transit",
          "elementType": "all",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "water",
          "elementType": "all",
          "stylers": [
              {
                  "color": "#57677a"
              },
              {
                  "visibility": "on"
              }
          ]
      },
      {
          "featureType": "water",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "lightness": "40"
              }
          ]
      }
  ]
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
        url: "markerred.png",
        scaledSize: new google.maps.Size(21, 21),
      }
    });

    globals.App.map.setCenter(marker.getPosition());
    console.log("The User's Position is: " + marker.getPosition());
  });
};


  globals.App.getBikePoints = function() {
    return $.get("http://localhost:3000/bikes").done(this.loopThroughBikes);
  };



  globals.App.loopThroughBikes = function(data) {
    console.log(data);


    return $.each(data, (index, data) => {

        globals.App.createMarkerForBike(data);

    });
  };


  globals.App.addInfoWindowForBike = function(data, marker) {
    //event listener on marker using google object

    google.maps.event.addListener(marker, 'click', () => {
      if(typeof this.infoWindow != "undefined") this.infoWindow.close();

      this.infoWindow = new google.maps.InfoWindow({
        content:`<div><p id="bikeLocation">Location: ${ data.name }</p><p id="bikesAvailable"><strong>Bikes Available: ${ data.NbBikes}</strong></p>
        <p id="emptyDocks"><strong>Empty Docks: ${ data.NbEmptyDocks}</strong></p>
        </div>`
      });

      this.infoWindow.open(this.map, marker);
      this.map.setCenter(marker.getPosition());
    });
  };


  globals.App.createMarkerForBike = function(data) {
    let latLng = new google.maps.LatLng(data.lat,data.lon);
    let marker = new google.maps.Marker({
      position: latLng,
      map: this.map,
      icon: {
        url: "markerblue2.png",
        scaledSize: new google.maps.Size(14, 14)
      }
      // animation: google.maps.Animation.DROP,
    });
    this.addInfoWindowForBike(data, marker);
  };

  $(globals.App.mapSetup.bind(globals.App));

}(this));
