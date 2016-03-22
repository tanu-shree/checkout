'use strict';

/**
 * @ngdoc service
 * @name newappApp.Wallet
 * @description
 * # Wallet
 * Factory in the newappApp.
 */
angular.module('newappApp')
  .factory('Wallet', function () {
   var dictWalletImg = {
        "mobikwik_wallet": "mobikwik-logo.jpg",
        "paytm_wallet": "paytm-logo.jpg",
        "payu_wallet": "payumoney.jpg",
        "payzippy_wallet": "payzippy.jpg",
        
    }
    return dictWalletImg;
  });
