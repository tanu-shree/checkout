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
            scope.$watch('[ccinfo.month,ccinfo.year]',function(value){
                console.log(scope.ccinfo.month+' '+scope.ccinfo.year);
                console.log(scope.currentMonth+' '+scope.currentYear);
              ctrl.$setValidity('invalid',true);
              if ( scope.ccinfo.year == scope.currentYear
                   && scope.ccinfo.month <= scope.currentMonth
                 ) {
                  console.log('came here');
                ctrl.$setValidity('invalid',false);
              }
              return value;
            },true)
          }
        }
      return directive;
  });
