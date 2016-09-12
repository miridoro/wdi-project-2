const googleMap = {};


googleMap.mapSetup = function() {
  let canvas = document.getElementById('map-canvas');

  let mapOptions = {
    zoom: 12,
    center: new google.maps.LatLng(51.506178,-0.088369),
    mapType: google.maps.MapTypeId.ROADMAP,
    styles: [
    {
        "featureType": "all",
        "elementType": "all",
        "stylers": [
            {
                "color": "#2fdcc6"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#3e606f"
            },
            {
                "weight": 2
            },
            {
                "gamma": 0.84
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry",
        "stylers": [
            {
                "weight": 0.6
            },
            {
                "color": "#1a3541"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#2c5a71"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#406d80"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#2c5a71"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#29768a"
            },
            {
                "lightness": -37
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#406d80"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#193341"
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
      content:`<p>Find me at: ${ data.name }<br><p>Bikes Available: ${ data.NbEmptyDocks}</p></p>`
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
