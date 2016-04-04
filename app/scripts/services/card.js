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
        "mastercard": "mast_cc.png",
        "visa": "visa_cc.png",
        "amex": "amex_cc.png"
        
    }
    return dictCardImg;
  });
