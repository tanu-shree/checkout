'use strict';

/**
 * @ngdoc directive
 * @name newappApp.directive:creditCardType
 * @description
 * # creditCardType
 */
angular.module('newappApp')
  .directive('creditCardType', function () {
    var directive =
        { require: 'ngModel'
        , link: function(scope, elm, attrs, ctrl){
            ctrl.$parsers.unshift(function(value){
                console.log(value);
              scope.ccinfo.type =
                (/^5[1-5]/.test(value)) ? 'mast_cc'//"mastercard"
                : (/4[0-9]{12}(?:[0-9]{3})/.test(value)) ? 'visa_cc'//"visa"
                : (/^3[47]/.test(value)) ?'amex_cc' //'amex'
                : (/^6011|65|64[4-9]|622(1(2[6-9]|[3-9]\d)|[2-8]\d{2}|9([01]\d|2[0-5]))/.test(value)) ? 'discover'
                : (/^35(2[89]|[3-8][0-9])/.test(value)) ? 'jcb_cc'//'JCB'
                : (/^30[0-5]/.test(value)) ? 'dinec_cc'//'Diners Club Carte Blanche'
                : (/^(2014)|^(2149)/.test(value)) ? 'dinec_cc'//'Diners Club enRoute'
                : (/^36/.test(value)) ? 'dinec_cc'//'Diners Club International'
                : undefined
               ctrl.$setValidity('invalid',!!scope.ccinfo.type);
                var clean = value.replace( /[^0-9]+/g, '');
                clean=" ";
                clean=clean.concat(value);
                console.log(clean.length);
                //clean=clean+' ';
                //console.log(clean+" ");
                ctrl.$setViewValue(clean);
                ctrl.$render();
                return clean;
                
              
            })
          }
        };;
      console.log(directive);
      return directive
    
  });
