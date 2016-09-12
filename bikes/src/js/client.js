const googleMap = {};


googleMap.mapSetup = function() {
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

  this.getBikePoints();
};


googleMap.getBikePoints = function() {
  return $.get("http://localhost:3000/bikes").done(this.loopThroughBikes);
};

googleMap.loopThroughBikes = function(data) {
  console.log(data);
  return $.each(data, (index, data) => {

      googleMap.createMarkerForBike(data);

  });

};

googleMap.addInfoWindowForBike = function(data, marker) {
  //event listener on marker using google object

  google.maps.event.addListener(marker, 'click', () => {
    if(typeof this.infoWindow != "undefined") this.infoWindow.close();

    this.infoWindow = new google.maps.InfoWindow({
      content:`<div><h4 id="bikeLocation">${ data.name }</h4><br><p id="bikesAvailable"><strong>Bikes Available: ${ data.NbEmptyDocks}</strong></p></div>`
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
    icon: {
      url: "https://cdn1.iconfinder.com/data/icons/Map-Markers-Icons-Demo-PNG/256/Map-Marker-Marker-Outside-Chartreuse.png",
      scaledSize: new google.maps.Size(22, 22)
    }
    // animation: google.maps.Animation.DROP,
  });
  this.addInfoWindowForBike(data, marker);
};



$(googleMap.mapSetup.bind(googleMap));
