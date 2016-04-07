'use strict';

/**
 * @ngdoc directive
 * @name newappApp.directive:tyProcessing
 * @description
 * # tyProcessing
 */
angular.module('newappApp')
  .directive('tyProcessing', function () {
    return {
      template: '<div class="process-wrapper"><center> <img src="images/spinnerTravelyaari.gif" ng-if="show" /></center><div class="active-screen" ng-if="show"></div></div>',
      scope:{
        show:'='
      },
      restrict: 'E',
      transclude:true,
      link: function postLink(scope, element, attrs) {}
    };
  });
