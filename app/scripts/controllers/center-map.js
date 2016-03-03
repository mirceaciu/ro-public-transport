'use strict';

/**
 * @ngdoc function
 * @name ratbApp.controller:CenterMapCtrl
 * @description
 * # CenterMapCtrl
 * Controller of the ratbApp
 */
 

 
angular.module('ratbApp')
  .controller('CenterMapCtrl', [ '$scope' , '$routeParams', '$http', '$location', function($scope, $routeParams, $http, $location){
	
	$scope.isActive = function(route) {
        	return route === $location.path();
    	};

	//initial leaflet controls
	angular.extend($scope, {
		center: {},
		name: {},
		paths: {},
		defaults: {
			scrollWheelZoom: false
		}
	});
	
	$scope.buttonRequest = function(){
		//$scope.masina.masina = $scope.car.name[0];
		$http.get('data/masina-'+ $scope.masina.masina +'.json').success(function(route) {
      	$scope.routeData = route;
		$scope.routeOptions = ['1', '101', '102', '103', '104', '105', '106', '11', '112', '116', '117', '122', '123', '124', '125', '126', '131', '133', '135', '136', '137', '138', '139', '14', '141', '143', '149', '16', '162', '163', '168', '173', '178', '182', '21', '220', '221', '232', '246', '25', '253', '261', '268', '27', '282', '300', '301', '302', '304', '311', '312', '313', '32', '323', '330', '331', '335', '336', '35', '36', '368', '381', '385', '40', '409', '41', '42', '422', '427', '438', '44', '45', '453', '455', '46', '47', '5', '56', '601', '61', '62', '634', '65', '655', '656', '66', '668', '682', '69', '697', '7', '70', '780', '783', '79', '8', '85', '86', '90', '91', '93', '96', 'N101', 'N102', 'N103', 'N104', 'N105', 'N106', 'N107', 'N108', 'N109', 'N110', 'N111', 'N112', 'N113', 'N114', 'N115', 'N116', 'N117', 'N118', 'N119', 'N120', 'N121', 'N122', 'N123', 'N124', 'N125'];
		
		//get directions number
		$scope.directionsCount = route.data.length;
		$scope.directionsList =[];
		for(var d = 0; d < $scope.directionsCount; d++ ){
			$scope.directionsList.push(d);
		}
		
		//get route from view
		$scope.currentRoute = route.data[$scope.masina.ruta];
		
		
		//get middle rounte for centering
		$scope.middleRoute = Math.round($scope.currentRoute.stops.length / 2) ;
		
		$scope.center= {
			lat: Number($scope.currentRoute.stops[$scope.middleRoute].latitude),
			lng: Number($scope.currentRoute.stops[$scope.middleRoute].longitude),
			zoom: 12,
		};
		
		$scope.status = {status: route.status};
		

		//get all paths of route
		$scope.pathCoordinates = [];
		for(var i = 0; i < $scope.currentRoute.stops.length; i++ ){
			$scope.pathCoordinates.push({lat: Number($scope.currentRoute.stops[i].latitude), lng: Number($scope.currentRoute.stops[i].longitude)});
		}
		//set color for direction
		if($scope.currentRoute.direction === '0' ){
			$scope.routeColor = '#0066ff';
		}else if ($scope.currentRoute.direction === '1'){
			$scope.routeColor = '#FF4500';
		}

		$scope.paths = {
			p1: {
					color: $scope.routeColor,
					weight: 6,
					latlngs: $scope.pathCoordinates
				}};           
    });
	};
  }]);