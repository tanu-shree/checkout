'use strict';

/**
 * @ngdoc service
 * @name newappApp.CashCard
 * @description
 * # CashCard
 * Factory in the newappApp.
 */
angular.module('newappApp')
  .factory('CashCard', function () {
    var dictCashCardImg = {
        "airmo_cashc": "airtelmoney.jpg",
        "freecharge_wallet": "freecharge-wallet.jpg",
        "icash_cashc": "icashcard.jpg",
        "itzno_cashc": "itscash.jpg",
        "oxi_cashc": "oxigen.jpg",
        "payc_cashc": "payc.jpg",

    }
    return dictCashCardImg;
  });
