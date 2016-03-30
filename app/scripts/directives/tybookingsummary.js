'use strict';

/**
 * @ngdoc directive
 * @name newappApp.directive:tyBookingSummary
 * @description
 * # tyBookingSummary
 */
angular.module('newappApp')
  .directive('tyBookingSummary', function () {
    return {
      scope: true,
        templateUrl: '/views/bookingsummary.html',
        restrict: 'E',
        controller:['$scope','checkoutConstant', function($scope,checkoutConstant){
            
            $scope.reliabiltyPrice=0;
            var reliability_price=0;
            
            $scope.$on('checkout',function(checkout) {
                 
                 if($scope.CheckoutDetail.type==1){
                     
                    var compName=$scope.CheckoutDetail.order_summary.bus_booking.onwards.CompanyName; 
                    var compNameUpper=compName.toUpperCase();
                    $scope.showReliabilty=(compNameUpper!='PUNBUS' &&  $scope.CheckoutDetail.order_summary.bus_booking.onwards.CompanyId!='10953' && $scope.CheckoutDetail.order_summary.bus_booking.onwards.CompanyId!='11854'&& $scope.CheckoutDetail.type!=2);
                
                    reliability_price=$scope.showReliabilty==true && $scope.isCheckedReliability==true? $scope.CheckoutDetail.order_summary.bus_booking.onwards.fareDetails.insuranceFees + $scope.CheckoutDetail.order_summary.bus_booking.return.fareDetails.insuranceFees:0;
                
                    $scope.reliabiltyPrice=reliability_price;
                
    
                 }
                 if($scope.CheckoutDetail.type==2){
                    $scope.reliabiltyPrice=0;
                    
                 }
                 
                
                 
            });
            $scope.changeReliabilityOption=function(e){
               
                if(e==true){
                    $scope.reliabiltyPrice=reliability_price;
                }
                else{
                    $scope.reliabiltyPrice=0;
                    
                }
               
            }
            /*function fareDetailInfo(){
                
                console.log("reached here");
                var type=$scope.CheckoutDetail.type;
                if(type==1){
                    var i=0;
                    $scope.fareDetails={
                        'Onward Trip Fare': $scope.CheckoutDetail.order_summary.bus_booking.onwards.fareDetails.totalFare,
                        'Return Trip Fare': $scope.CheckoutDetail.order_summary.bus_booking.return.fareDetails.totalFare,
                        'Service Tax':$scope.CheckoutDetail.order_summary.bus_booking.onwards.fareDetails.serviceTax + $scope.CheckoutDetail.order_summary.bus_booking.return.fareDetails.serviceTax,
                        'I Want Reliability Service':$scope.CheckoutDetail.order_summary.bus_booking.onwards.fareDetails.insuranceFees + $scope.CheckoutDetail.order_summary.bus_booking.return.fareDetails.insuranceFees,
                        'Discount':$scope.CheckoutDetail.order_summary.bus_booking.onwards.fareDetails.discountAmount + $scope.CheckoutDetail.order_summary.bus_booking.return.fareDetails.discountAmount
                    };
                }
                console.log($scope.fareDetails);
            }*/
            
        }],
        link: function postLink(scope, element, attrs) {}
      }
    
  });
