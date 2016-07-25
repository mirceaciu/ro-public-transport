'use strict';

/**
 * @ngdoc function
 * @name transportApp.controller:TestctrlCtrl
 * @description
 * # TestctrlCtrl
 * Controller of the transportApp
 */
angular.module('transportApp')
  .controller('TestctrlCtrl', function ($scope) {
    $scope.swiper = {};

      $scope.onReadySwiper = function (swiper) {

        swiper.on('slideChangeStart', function () {

          console.log('slideChangeStart');
        });
      };

  });
