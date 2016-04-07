'use strict';

/**
 * @ngdoc directive
 * @name newappApp.directive:tyHotelSummary
 * @description
 * # tyHotelSummary
 */
angular.module('newappApp')
  .directive('tyHotelSummary', function () {
    return {
      templateUrl: 'views/hotelsummary.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
      }
    };
  });
