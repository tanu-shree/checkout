'use strict';

/**
 * @ngdoc directive
 * @name newappApp.directive:tylogin
 * @description
 * # tylogin
 */
var modLogin=angular.module('modLogin',[]);
modLogin
  .directive('tyLogin', function () {
    return {
      scope:{},
      templateUrl: '/views/login.html',
      restrict: 'E',
      controller: ['$scope','$rootScope','$timeout','checkoutConstant', function ($scope,$rootScope,$timeout,checkoutConstant) {
        $scope.loginInfo={email:undefined,password:undefined};
        $rootScope.loginShow = false;
    
        $rootScope.$on(checkoutConstant.OPEN_LOGIN, function() {
            
            $rootScope.loginShow = true;
            
        });
        $rootScope.$on(checkoutConstant.CLOSE_LOGIN, function() {
            $rootScope.loginShow = false;
        });
        $rootScope.$on('$routeChangeSuccess', function() {
            $timeout(function() {
                $rootScope.loginShow = false;
            }, 1000);
        });
        $rootScope.changeLoginDisplay = function() {
            
            if ($rootScope.loginShow) {
                $rootScope.$broadcast(checkoutConstant.CLOSE_LOGIN);
            }
            else{
                $rootScope.$broadcast(checkoutConstant.OPEN_LOGIN);
            }
        };
        $scope.closeLogin=function(){
            $rootScope.$broadcast(checkoutConstant.CLOSE_LOGIN);
        }
        $scope.signIn=function(){
           console.log("came here");
           
           
        };
      }],
      link: function postLink(scope, element, attrs) {
      }
    };
  });
