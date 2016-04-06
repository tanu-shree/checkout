'use strict';

/**
 * @ngdoc directive
 * @name newappApp.directive:cardExpiration
 * @description
 * # cardExpiration
 */
angular.module('newappApp')
  .directive('cardExpiration', function () {
    var directive =
        { require: 'ngModel',
         scope: {
              ccinfomonth: "=",
              ccinfoyear: "="
            }
        , link: function(scope, elm, attrs, ctrl){
            scope.$watch('[ccinfomonth,ccinfoyear]',function(newval,oldval){
                var month=new Date().getMonth()+1;
                if(month>=9){
                    month=("0").concat(month);
                }
                var curDate=new Date(month+"-"+"01"+"-"+new Date().getFullYear());
                var dateInput=new Date(scope.ccinfomonth+"-"+"01"+"-"+scope.ccinfoyear);
                ctrl.$setValidity('invalid',false);
               if (scope.ccinfomonth==null || dateInput>=curDate) {
                 
                ctrl.$setValidity('invalid',true);
              }
                
              
            },true);
            
          }
        }
      return directive;
  });
