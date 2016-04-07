'use strict';

/**
 * @ngdoc directive
 * @name newappApp.directive:tyBusSummary
 * @description
 * # tyBusSummary
 */
angular.module('newappApp')
  .directive('tyBusSummary', function () {
    return {
      scope: {
        summary:'=',
        discount:'='
      },
        templateUrl: 'views/bussummary.html',
        restrict: 'E',
        controller:['$scope','checkoutConstant', function($scope,checkoutConstant){
            
            $scope.reliabiltyPrice=0;
            var reliability_price=0;
            
            $scope.onwardPickupDetail={Details:[]};
            $scope.returnPickupDetail={Details:[]};
            $scope.discountAmount=0;
            $scope.reliability={Details:[' Make alternate arrangements if bus services are cancelled including arrangements in upgraded buses','Free Personal accident Insurance,  Coverage of Rs.1,00,000/- (Rupees One Lakh) for death or dismemberment during journey under Personal Accident Policy from Tata AIG General Insurance Company Ltd.']};
            
            $scope.changeReliabilityOption=function(e){
               
                if(e==true){
                    $scope.reliabiltyPrice=reliability_price;
                }
                else{
                    $scope.reliabiltyPrice=0;
                    
                }
               
            }
            function createMyWatch(varName,callback){
                var myWatch=$scope.$watch(varName,function(newval,oldval){
                    console.log("watch");
                    console.log($scope.payment);
                    console.log($scope);
                    if ($scope[varName]!=undefined){
                        myWatch();
                        callback();
                    }
                },true);    
            }
            
            createMyWatch('summary',function(){
                    console.log("printing summary");
                    console.log($scope.summary);
                    
                    $scope.discount=$scope.summary.onwards.fareDetails.discountAmount;
                    if($scope.summary.mode==checkoutConstant.ROUNDTRIP){
                        $scope.discount +=$scope.summary.return.fareDetails.discountAmount;
                    }
                     
                    var compName=$scope.summary.onwards.CompanyName; 
                    var compNameUpper=compName.toUpperCase();
                    $scope.showReliabilty=(compNameUpper!='PUNBUS' &&  $scope.summary.onwards.CompanyId!='10953' && $scope.summary.onwards.CompanyId!='11854');
                
                    reliability_price=$scope.showReliabilty==true && $scope.isCheckedReliability==true? $scope.summary.onwards.fareDetails.insuranceFees + $scope.summary.return.fareDetails.insuranceFees:0;
                
                    $scope.reliabiltyPrice=reliability_price;
                    
                    $scope.onwardPickupDetail={Details:[$scope.summary.onwards.pickupDetails.PickupName, $scope.summary.onwards.pickupDetails.Address, $scope.summary.onwards.pickupDetails.PickupTime]};
                
                    if($scope.summary.mode==checkoutConstant.ROUNDTRIP)
                    $scope.returnPickupDetail={Details:[$scope.summary.return.pickupDetails.PickupName, $scope.summary.return.pickupDetails.Address, $scope.summary.return.pickupDetails.PickupTime]};
                
                    
                
            });
            
        }],
        link: function postLink(scope, element, attrs) {}
      }
    
  });
