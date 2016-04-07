'use strict';

/**
 * @ngdoc filter
 * @name newappApp.filter:cardPattern
 * @function
 * @description
 * # cardPattern
 * Filter in the newappApp.
 */
angular.module('newappApp')
  .filter('cardPattern', function () {
    return function (input) {
      if(input!=null){
          if(input.length%4==0){
            input=input+"-";
          }
      }
      return input;
    };
  });
