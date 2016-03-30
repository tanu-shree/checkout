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
        "airmo_cashc": "airtelmoney.jpg",
        "freecharge_wallet": "freecharge-wallet.jpg",
        "icash_cashc": "icashcard.jpg",
        "itzno_cashc": "itscash.jpg",
        "oxi_cashc": "oxigen.jpg",
        "payc_cashc": "payc.jpg"
        
    }
    return dictWalletImg;
  });
