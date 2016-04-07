'use strict';

/**
 * @ngdoc directive
 * @name newappApp.directive:tylogin
 * @description
 * # tylogin
 */
angular.module('newappApp')
  .directive('tyLogin', function () {
    return {
      
      templateUrl: 'views/login.html',
      restrict: 'E',
      controller: ['$scope','$rootScope','$timeout','checkoutConstant','FACEBOOK_CONSTANTS', 'GOOGLE_CONSTANTS','CheckoutService', function ($scope,$rootScope,$timeout,checkoutConstant,FACEBOOK_CONSTANTS,GOOGLE_CONSTANTS,CheckoutService) {
                 //Login integration
            $scope.loginDetail={email:null,password:null};
            $scope.popup = {
                isOpen: false
            };

            $rootScope.popUpVisibility = function(bool) {
                $scope.popup.isOpen = bool;
            };

            $scope.preventBubble = function(event) {
                event.stopPropagation();
            };

            $scope.$on(FACEBOOK_CONSTANTS.SIGN_IN_LISTENER, function(event, response, meresponse) {
                console.log(response);
                console.log(meresponse);
                if(response.authResponse!==undefined){
                    console.log("facebook logged in");
                    $scope.$broadcast(checkoutConstant.LOGGED_IN);
                }
            });

            $scope.$on(GOOGLE_CONSTANTS.SIGN_IN_LISTENER, function(event, response, meresponse) {
                console.log(response);
                console.log(meresponse);
                if(response.El!==null){
                    console.log("gmail logged in");
                    $scope.$broadcast(checkoutConstant.LOGGED_IN);
                }
            });

            $scope.signIn=function(email,password){

                if(email!==null && password!==null){

                    var postData={email:email,password:password,remember:false};
                    CheckoutService.checkLogin(postData).then(function(loginResponse){
                        console.log(loginResponse.data);
                        if(loginResponse.data.success===true){
                            $rootScope.loggedIn=true;
                            $scope.popup.isOpen=false;
                            $scope.$broadcast(checkoutConstant.LOGGED_IN);
                        }
                    });
                }
            };

            $scope.login = {
                isOpen: true
            };

            $scope.signInShow = function(e, bool) {
                e.preventDefault();
                $scope.login.isOpen = bool;
            };

           
        
      }],
      link: function postLink(scope, element, attrs) {
      }
    };
  });
