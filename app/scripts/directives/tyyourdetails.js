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
        controller: ['$scope','CheckoutService',  function ($scope,CheckoutService) {
            $scope.firstSection = true;
            $scope.confirmBooking = function () {
                if ($scope.customerDetail.email != null && $scope.customerDetail.mobile != null) {
                    $scope.firstSection = false;
                    $scope.tabInfo = true;
                   
                    var myEl = angular.element( document.querySelector( '.paymentMethod' ) );
                    myEl.removeAttr('style');
                }
                
                
            };

            $scope.edit = function () {
                $scope.firstSection = true;
                $scope.tabInfo = false;
                
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
                
                else if(e.target.id=="couponInput"){
                    
                    if(e.keyCode==13){
                        
                        if($scope.customerDetail.coupon!=null){
                            checkCoupon();
                        }
                        else{
                            $scope.customerDetail.discount=0;
                            $scope.couponMsg="Please Enter Coupon Code";
                        }
                    }
                }

            };
            function checkCoupon(){
                var postData={coupon:$scope.customerDetail.coupon,token:$scope.token};
                CheckoutService.checkCoupon($scope.customerDetail.coupon,postData).then(function(response){
                    if(response.data.success==true){
                        $scope.customerDetail.discount=response.data.discountAmount;
                        $scope.couponMsg="You just saved Rs."+$scope.customerDetail.discount+" on the fare";
                    }
                    else{
                        $scope.customerDetail.discount=0;
                        $scope.couponMsg=response.data.errorMsg;
                    }

                });
            }
        }],
        link: function postLink(scope, element, attrs) {
            
        }
    };
    
  });
