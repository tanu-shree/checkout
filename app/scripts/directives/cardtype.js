'use strict';

/**
 * @ngdoc directive
 * @name newappApp.directive:creditCardType
 * @description
 * # creditCardType
 */
angular.module('newappApp')
  .directive('creditCardType',['cardConstant', function (cardConstant) {
    var directive =
        { require: 'ngModel',
         scope: {
              ccinfotype: "=",
              
            }
        , link: function(scope, elm, attrs, ctrl){
             var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; }
             
            ctrl.$parsers.unshift(function(value){
                
                var clean = value.replace( /[^0-9]+/g, '');
                console.log(clean);
                scope.ccinfotype=cardType(clean);
                ctrl.$setValidity('invalid',validateCardNumber(clean));
                var formated_value="";
                for(var i=0;i<clean.length;i+=4){
                    formated_value+=clean.substr(i,4)+" - ";
                }
                if (formated_value.length>0){
                    formated_value=formated_value.substr(0,formated_value.length-3);
                }
                elm.val(formated_value);
                //ctrl.$setViewValue(clean);
                //ctrl.$render();
                return clean;
                
              
            });
            
            
            function  luhnCheck (num) {
                var digit, digits, odd, sum, _i, _len;
                odd = true;
                sum = 0;
                digits = (num + '').split('').reverse();
                for (_i = 0, _len = digits.length; _i < _len; _i++) {
                  digit = digits[_i];
                  digit = parseInt(digit, 10);
                  if ((odd = !odd)) {
                    digit *= 2;
                  }
                  if (digit > 9) {
                    digit -= 9;
                  }
                  sum += digit;
                }
                return sum % 10 === 0;
              };
            
            function cardFromNumber(num) {
                var card, _i, _len;
                num = (num + '').replace(/\D/g, '');
                for (_i = 0, _len = cardConstant.length; _i < _len; _i++) {
                  card = cardConstant[_i];
                  if (card.pattern.test(num)) {
                    return card;
                  }
                }
              };
            
            function validateCardNumber(num){
          
                var card, _ref;
                num = (num + '').replace(/\s+|-/g, '');
                if (!/^\d+$/.test(num)) {
                  return false;
                }
                card = cardFromNumber(num);
                if (!card) {
                  return false;
                }
                return (_ref = num.length, __indexOf.call(card.length, _ref) >= 0) && (card.luhn === false || luhnCheck(num));
            };
            
            function cardType(num){
                 var _ref;
                if (!num) {
                  return null;
                }
                return ((_ref = cardFromNumber(num)) != null ? _ref.type : void 0) || null;
            };
          }
        };;
      console.log(directive);
      return directive
    
  }]);
