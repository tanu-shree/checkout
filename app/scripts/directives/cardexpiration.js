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
        { require: 'ngModel'
        , link: function(scope, elm, attrs, ctrl){
            scope.$watch('[ccinfo.month,ccinfo.year]',function(newval,oldval){
                var month=new Date().getMonth()+1;
                if(month>=9){
                    month=("0").concat(month);
                }
                var curDate=new Date(month+"-"+"01"+"-"+new Date().getFullYear());
                var dateInput=new Date(scope.ccinfo.month+"-"+"01"+"-"+scope.ccinfo.year);
                ctrl.$setValidity('invalid',false);
               if (scope.ccinfo.month==null || dateInput>=curDate) {
                 
                ctrl.$setValidity('invalid',true);
              }
                
              //return value;
            },true);
            
          }
        }
      return directive;
  });
