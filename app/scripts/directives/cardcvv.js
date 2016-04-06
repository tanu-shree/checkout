'use strict';

/**
 * @ngdoc directive
 * @name newappApp.directive:creditCardCvv
 * @description
 * # creditCardCvv
 */
angular.module('newappApp')
  .directive('cardCvv',['cardConstant', function (cardConstant) {
     var directive =
        { require: 'ngModel',
         scope: {
              ccinfotype: "=",
              
            },
         link: function(scope, elm, attrs, ctrl){
             
            ctrl.$parsers.unshift(function(value){
                
                scope.$watch('ccinfotype',function(){
                     if(value!=null){
                        checkValue(value);
                     }
                 },true);
                
                checkValue(value);        

                return value;
                
            });
            function checkValue(value){
                
                ctrl.$setValidity('invalid',validateCardCVV(value,scope.ccinfotype));
                     
            }
        
        var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; }
        
        function validateCardCVV(cvc,type){
             
            var _ref, _ref1;
           // cvc = cvc.trim();
            
            if (type) {
               return _ref = cvc.length, __indexOf.call((_ref1 = cardFromType(type)) != null ? _ref1.cvcLength : void 0, _ref) >= 0;
                
            } else {
                
              return cvc.length >= 3 && cvc.length <= 4;
            }
        }
        function cardFromType(type) {
            var card, _i, _len;
            for (_i = 0, _len = cardConstant.length; _i < _len; _i++) {
              card = cardConstant[_i];
              if (card.type === type) {
                return card;
              }
            }
          };
      }
    };
  
      console.log(directive);
      return directive
    
  }]);

