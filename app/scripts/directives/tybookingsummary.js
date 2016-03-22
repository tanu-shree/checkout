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
        controller:['$scope', function($scope){
            
            var returnDiscount=0;
            $scope.reliabiltyPrice=0;
            var reliability_price=0;
            var discountAmount=0;
            
            $scope.$on('checkout',function(checkout) {
                 
                 if($scope.CheckoutDetail.order_type==1){
                    var showRoundtrip = (($scope.CheckoutDetail.bookOnlyOneway==null) && ($scope.CheckoutDetail.mode == "roundtrip") || ($scope.CheckoutDetail.mode == "onehop" && $scope.CheckoutDetail.routeScheduleId2))? true : false;
                    var onwardDiscount=$scope.CheckoutDetail.extra.onward.operatorDiscount? $scope.CheckoutDetail.extra.onward.operatorDiscount:0;    
                    discountAmount=$scope.CheckoutDetail.fareDetails.discount.amount+onwardDiscount;
                    if(showRoundtrip){
                        returnDiscount=$scope.CheckoutDetail.extra.return.operatorDiscount?$scope.CheckoutDetail.extra.return.operatorDiscount:0;    
                        discountAmount+=returnDiscount;
                    }
                    $scope.discountAmount=discountAmount;
                    $scope.totalJourneyFare=$scope.CheckoutDetail.fareDetails.totalPrice-onwardDiscount-returnDiscount;
                     
                    var compName=$scope.CheckoutDetail.extra.onward.journey.companyName; 
                    var compNameUpper=compName.toUpperCase();
                    $scope.showReliabilty=(compNameUpper!='PUNBUS'&& $scope.CheckoutDetail.extra.onward.route.CompanyId!='10953'&& $scope.CheckoutDetail.extra.onward.route.CompanyId!='11854'&& $scope.CheckoutDetail.order_type!=2);
                
                    reliability_price=$scope.showReliabilty==true && $scope.isCheckedReliability==true? $scope.CheckoutDetail.fareDetails.insuranceFees:0;
                
                    $scope.reliabiltyPrice=reliability_price;
                
    
                 }
                 if($scope.CheckoutDetail.order_type==2){
                    $scope.reliabiltyPrice=0;
                    $scope.totalJourneyFare=$scope.CheckoutDetail.fareDetails.totalPrice;
                 }
                 
                
                 
            });
            $scope.changeReliabilityOption=function(e){
                console.log("change");
                console.log(e);
                if(e==true){
                    $scope.reliabiltyPrice=reliability_price;
                }
                else{
                    $scope.reliabiltyPrice=0;
                    
                }
                console.log("reliabiltyPrice "+$scope.reliabiltyPrice);
            }
            
            
        }],
        link: function postLink(scope, element, attrs) {}
      }
    
  });
