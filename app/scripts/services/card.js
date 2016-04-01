'use strict';

/**
 * @ngdoc service
 * @name newappApp.Card
 * @description
 * # Card
 * Factory in the newappApp.
 */
angular.module('newappApp')
  .factory('Card', function () {
    var dictCardImg = {
        "mast_cc": "mast_cc.png",
        "visa_cc": "visa_cc.png",
        "amex_cc": "amex_cc.png"
        
        
    }
    return dictCardImg;
  });
