'use strict';

/**
 * @ngdoc service
 * @name newappApp.NetBank
 * @description
 * # NetBank
 * Factory in the newappApp.
 */
angular.module('newappApp')
  .factory('NetBank', function () {
   var dictNetBankImg = {
        "axis_nb": "axil-logo.jpg",
        "citi_nb": "citybank-logo.jpg",
        "hdfc_nb": "hdfc-bank.jpg",
        "icici_nb": "icici-bank.jpg",
        "idbi_nb": "idbi-logo.jpg",
        "sbi_nb": "state-bank.jpg",
        "idbi_nb":"idbibank.jpg"
        
    }
    return dictNetBankImg;
  });
