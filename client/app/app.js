angular.module('app', ['ngRoute'])
.controller('driversController',['$scope', function($scope) {

  //create new map
  var map;
  var currentLocationMarker;
  var watchId; //Watcher for current position
  var currLat;
  var currLong;

  function initialize() {
    var mapOptions = {
      zoom: 14,
      center: new google.maps.LatLng(-34.397, 150.644)
    };
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
  }

  google.maps.event.addDomListener(window, 'load', initialize);

 //get users current 
  $scope.currentLocation = function() {

    var makeGooglePos = function(position) {
      return new google.maps.LatLng( position.coords.latitude,
                                     position.coords.longitude );
    };

    //keeps track of users current location
    if (!watchId) {
      watchId = navigator.geolocation.watchPosition(function(position) {
        if (position.coords.latitude && position.coords.longitude) {
          //These are the saved current position as it updates
          currLat = position.coords.latitude;
          currLong = position.coords.longitude;
          var latlng = makeGooglePos(position);
          if (currentLocationMarker) {
            currentLocationMarker.setPosition(latlng);
          } else {
            currentLocationMarker = new google.maps.Marker({
              position: latlng,
              map: map,
              title: 'you',
              animation: google.maps.Animation.BOUNCE,
              icon: 'http://maps.google.com/mapfiles/ms/icons/purple-dot.png'
            });
          }
           map.setCenter(latlng);
        }
      });
    }
  };
}]);
