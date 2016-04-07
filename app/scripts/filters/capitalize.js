'use strict';

/**
 * @ngdoc filter
 * @name newappApp.filter:capitalize
 * @function
 * @description
 * # capitalize
 * Filter in the newappApp.
 */
angular.module('newappApp')
  .filter('capitalize', function () {
    return function(input, scope) {
        if (input!=null)
        input = input.toLowerCase();
        return input.substring(0,1).toUpperCase()+input.substring(1);
      }
  });
