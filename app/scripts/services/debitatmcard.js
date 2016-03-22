'use strict';

/**
 * @ngdoc service
 * @name newappApp.debitAtmCard
 * @description
 * # debitAtmCard
 * Service in the newappApp.
 */
angular.module('newappApp')
  .service('debitAtmCard', function () {
    var dictDebitAtmImg = {
        "axis_nb": "axil-logo.jpg",
        "citi_nb": "citybank-logo.jpg",
        "hdfc_nb": "hdfc-bank.jpg",
        "icici_nb": "icici-bank.jpg",
        "idbi_nb": "idbi-logo.jpg",
        "sbi_nb": "state-bank.jpg"
        
    }
    return dictDebitAtmImg;
  });
