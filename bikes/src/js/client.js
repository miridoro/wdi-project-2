const googleMap = {};


googleMap.mapSetup = function() {
  let canvas = document.getElementById('map-canvas');

  let mapOptions = {
    zoom: 12,
    center: new google.maps.LatLng(51.506178,-0.088369),
    mapType: google.maps.MapTypeId.ROADMAP,
    styles: [
    {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
            {
                "saturation": "-100"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text",
        "stylers": [
            {
                "color": "#545454"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "saturation": "-87"
            },
            {
                "lightness": "-40"
            },
            {
                "color": "#f9e629"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#f0f0f0"
            },
            {
                "saturation": "-22"
            },
            {
                "lightness": "-16"
            }
        ]
    },
    {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.highway.controlled_access",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "saturation": "-52"
            },
            {
                "lightness": "-16"
            },
            {
                "color": "#93c4d3"
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
