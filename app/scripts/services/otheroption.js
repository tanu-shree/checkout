'use strict';

/**
 * @ngdoc service
 * @name newappApp.otherOption
 * @description
 * # otherOption
 * Factory in the newappApp.
 */
angular.module('newappApp')
  .factory('OtherOption', function () {
    var dictOtherOptionImg = {
        
        "can_nb":"canara_bank.jpg",
        "iob_nb":"iob.jpg",
        "pnbra_nb":"pnb.jpg",
        "paypal_int":"paypal_logo.png"
    };
    return dictOtherOptionImg;
  });
