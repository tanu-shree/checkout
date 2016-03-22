'use strict';

/**
 * @ngdoc directive
 * @name newappApp.directive:tyYourDetails
 * @description
 * # tyYourDetails
 */
angular.module('newappApp')
  .directive('tyYourDetails', function () {
      return {
        scope:false,
        templateUrl: '/views/yourdetail.html',
        restrict: 'E',
        controller: ['$scope',  function ($scope) {
            $scope.firstSection = true;
            $scope.confirmBooking = function () {
                if ($scope.customerDetail.email != null && $scope.customerDetail.mobile != null) {
                    $scope.firstSection = false;
                    $scope.tabInfo = true;
                   // $(".paymentMethod").removeAttr("style");
                    var myEl = angular.element( document.querySelector( '.paymentMethod' ) );
                    myEl.removeAttr('style');
                }
                
                
            };

            $scope.edit = function () {
                $scope.firstSection = true;
                $scope.tabInfo = false;
                //$(".paymentMethod").attr("style", "margin-top:100px; opacity: 0.2;");
                var myEl = angular.element( document.querySelector( '.paymentMethod' ) );
                myEl.attr('style','margin-top:100px; opacity: 0.2;');

            };

            var specialKeys = new Array();
            specialKeys.push(8); //Backspace
            specialKeys.push(9); //Tab
            specialKeys.push(46); //Delete
            specialKeys.push(36); //Home
            specialKeys.push(35); //End
            specialKeys.push(37); //Left
            specialKeys.push(39); //Right

            $scope.checkKeyPressed = function (e) {

                
               if (e.target.id == "emailInput") {

                    var keyCode = e.keyCode == 0 ? e.charCode : e.keyCode;
                    var ret = ((keyCode >= 48 && keyCode <= 57) || (keyCode >= 65 && keyCode <= 90) || (keyCode >= 97 && keyCode <= 122) || keyCode == 64 || keyCode == 95 || keyCode == 46 || (specialKeys.indexOf(e.keyCode) != -1 && e.charCode != e.keyCode));
                    if (ret == false) {
                        e.preventDefault();
                    }

                }

                else if (e.target.id == "phoneInput") {
                    var keyCode = e.keyCode == 0 ? e.charCode : e.keyCode;
                    var ret = ((keyCode >= 48 && keyCode <= 57) || (specialKeys.indexOf(e.keyCode) != -1 && e.charCode != e.keyCode));
                    if (ret == false) {
                        e.preventDefault();
                    }
                }

            };
            
        }],
        link: function postLink(scope, element, attrs) {
            
        }
    };
    
  });
