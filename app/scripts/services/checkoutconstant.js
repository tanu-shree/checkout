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
    'NETBANK':'nb',
    'CREDIT_CARD':'cc',
    'WALLET':'wallet',
    'OTHER_OPTION':'op',
    'EXPRESS':'express',
    'EXPRESS_CC_VISA': 'visa_cc_express',
    'EXPRESS_CC_MAESTRO': 'maestro_cc_express',
    'EXPRESS_CC_AMEX': 'amex_cc_express',
    'EXPRESS_CC_MASTER': 'mast_cc_express',
    'EXPRESS_CC_DINERS': 'dinec_cc_express',
    'EXPRESS_CC_JCB': 'jcb_cc_express',
    'EXPRESS_CC_LASER': 'laser_cc_express',
    'EXPRESS_CC_UNKNOWN': 'unkwn_cc_express',
    'EXPRESS_DC_VISA': 'visa_dc_express',
    'EXPRESS_DC_MAESTRO': 'maestro_dc_express',
    'EXPRESS_DC_AMEX': 'amex_dc_express',
    'EXPRESS_DC_MASTER': 'mast_dc_express',
    'EXPRESS_DC_DINERS': 'dinec_dc_express',
    'EXPRESS_DC_JCB': 'jcb_dc_express',
    'EXPRESS_DC_LASER': 'laser_dc_express',
    'EXPRESS_DC_UNKNOWN': 'unkwn_dc_express',
    'EXPRESS_DEFAULT': 'default_express',
    'EXPRESS_CARD_TYPE_CREDIT':'CREDIT',
    'EXPRESS_CARD_TYPE_DEBIT':'DEBIT',
    'OPEN_LOGIN':'open_login',
    'CLOSE_LOGIN':'close_login',
    'LOGIN':'login',
    'ROUNDTRIP':'roundtrip',
    'PAYMENT':'payment',
    'BUS':'bus',
    'HOTEL':'hotel',
    'TOUR':'tour',
    'ACTIVITY':'activity',
    'LOGGED_IN':'logged_in',
    'COOKIE_FOR_LOGGED_IN':'_ga',
    'TYPE_ONE':'bus',
    'TYPE_TWO':'tour',
    'TYPE_THREE':'activity'
});
