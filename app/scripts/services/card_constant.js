'use strict';

/**
 * @ngdoc service
 * @name newappApp.CARDCONSTANT
 * @description
 * # CARDCONSTANT
 * Factory in the newappApp.
 */
angular.module('newappApp')
  .factory('cardConstant', function () {
    var defaultFormat = /(\d{1,4})/g;
    var cards = [
            {
              type: 'maestro',
              pattern: /^(5018|5020|5038|504[4-9]|5081|6002|6037|6038|6220|6304|6759|676[1-3])/, //custom modification by Travelyaari
              format: defaultFormat,
              length: [12, 13, 14, 15, 16, 17, 18, 19],
              cvcLength: [3],
              luhn: true
            }, {
              type: 'dinersclub',
              pattern: /^(36|38|30[0-5])/,
              format: defaultFormat,
              length: [14],
              cvcLength: [3],
              luhn: true
            }, {
              type: 'laser',
              pattern: /^(6706|6771|6709)/,
              format: defaultFormat,
              length: [16, 17, 18, 19],
              cvcLength: [3],
              luhn: true
            }, {
              type: 'jcb',
              pattern: /^35/,
              format: defaultFormat,
              length: [16],
              cvcLength: [3],
              luhn: true
            }, {
              type: 'unionpay',
              pattern: /^62/,
              format: defaultFormat,
              length: [16, 17, 18, 19],
              cvcLength: [3],
              luhn: false
            }, {
              type: 'discover',
              pattern: /^(6011|65|64[4-9]|622)/,
              format: defaultFormat,
              length: [16],
              cvcLength: [3],
              luhn: true
            }, {
              type: 'mastercard',
              pattern: /^5[1-5]/,
              format: defaultFormat,
              length: [16],
              cvcLength: [3],
              luhn: true
            }, {
              type: 'amex',
              pattern: /^3[47]/,
              format: /(\d{1,4})(\d{1,6})?(\d{1,5})?/,
              length: [15],
              cvcLength: [3, 4],
              luhn: true
            }, {
              type: 'visa',
              pattern: /^4/,
              format: defaultFormat,
              length: [13, 14, 15, 16],
              cvcLength: [3],
              luhn: true
            }
          ];
    
   
           return cards;
  });
