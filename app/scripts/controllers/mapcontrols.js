'use strict';

/**
* @ngdoc function
* @name transportApp.controller:MapcontrolsCtrl
* @description
* # MapcontrolsCtrl
* Controller of the transportApp
*/



angular.module('transportApp')
  .controller('MapcontrolsCtrl', [ '$scope' , '$routeParams', '$http', '$location','leafletData', function($scope, $routeParams, $http, $location, leafletData){

  $scope.isActive = function(route) {
    return route === $location.path();
  };

// INITIAL LEAFLET controls
  angular.extend($scope, {
    center: {},
    name: {},
    paths: {},
    defaults: {
    scrollWheelZoom: false
    }
  });

// INIT ROUTING
  leafletData.getMap().then(function(map) {
    $scope.routingControl =  L.Routing.control({waypoints: $scope.pathCoordinates}).addTo(map);
  });

  /* HARD CODED CARS */
  $scope.routeOptions = ['102-t', '104-t', '105-t', '116-r', '116-t', '123-r', '123-t', '124-r', '133-r', '135-t', '137-t', '138-t', '143-r', '143-t', '149-t', '168-t', '178-t', '182-t', '185-r', '185-t', '202-t', '222-r', '222-t', '223-t', '227-r', '227-t', '232-r', '232-t', '236-r', '236-t', '243-r', '268-t', '282-t', '303-r', '313-r', '313-t', '323-r', '323-t', '336-r', '381-r', '381-t', '611-r', '668-r', '682-r'];

  // DEFINE 'ROUTE' BUTTON
  $scope.routeRequest = function(){
    //$scope.masina.masina = $scope.car.name[0];
    $http.get('data/bus/bus-'+ $scope.masina.masina +'.json').success(function(route) {
      $scope.routeData = route;

      //TRANSPORT URBAN DATA - scrap after building new data


    //get middle route for centering
    $scope.middleRoute = Math.round($scope.routeData.opriri.length / 2) ;

    $scope.center= {
      lat: Number($scope.routeData.opriri[$scope.middleRoute].lat),
      lng: Number($scope.routeData.opriri[$scope.middleRoute].long),
      zoom: 12,
    };

    //get all paths of route
    $scope.pathCoordinates = [];

    for(var i = 0; i < $scope.routeData.opriri.length; i++ ){
      $scope.pathCoordinates.push({lat: Number($scope.routeData.opriri[i].lat), lng: Number($scope.routeData.opriri[i].long)});
    }

    //set color for direction
    if($scope.routeData.direction === '0' ){
      $scope.routeColor = '#0066ff';
    }else if ($scope.routeData.direction === '1'){
      $scope.routeColor = '#FF4500';
    }

    $scope.routingControl.getPlan().setWaypoints($scope.pathCoordinates);

    $scope.paths = {
      p1: {
      color: $scope.routeColor,
      weight: 6,
      latlngs: $scope.pathCoordinates
    }};

  });
}; //buttonRequest

  $scope.customRouteRequest = function(){
    console.log('voi incarca geometrie');
    $http.get('data/restrict-ignore/masina-131.geojson').success(function(route) {
      $scope.routeData = route;
      console.log('am geometrie');
      //get route car's name from view
      $scope.routeData = $scope.routeData;

      //get all paths of route
      $scope.pathCoordinates = $scope.routeData.coordinates;

      $scope.paths = {
        p1: {
        color: '#663399',
        weight: 6,
        latlngs: $scope.pathCoordinates
      }};

  });


}; //custom route handler



}]);
