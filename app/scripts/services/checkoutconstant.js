'use strict';

/**
 * @ngdoc service
 * @name newappApp.checkoutConstant
 * @description
 * # checkoutConstant
 * Constant in the newappApp.
 */
angular.module('newappApp')
  .constant('checkoutConstant', {
    'net_bank':'nb',
    'debit_card':'db',
    'credit_card':'cc',
    'wallet':'wallet',
    'cash_card':'cashc',
    'int':'int',
    'express':'express'
});