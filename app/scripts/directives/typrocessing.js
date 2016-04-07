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
      templateUrl: '/views/processing.html',
      scope:{
        show:'='
      },
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        
      }
    };
  });
