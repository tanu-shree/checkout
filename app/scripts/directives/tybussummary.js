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
        summary:'='
      },
        templateUrl: '/views/bussummary.html',
        restrict: 'E',
        controller:['$scope','checkoutConstant', function($scope,checkoutConstant){
            
            $scope.reliabiltyPrice=0;
            var reliability_price=0;
            
           
            $scope.changeReliabilityOption=function(e){
               
                if(e==true){
                    $scope.reliabiltyPrice=reliability_price;
                }
                else{
                    $scope.reliabiltyPrice=0;
                    
                }
               
            }
            function createMyWatch(varName,callback){
                var myWatch=$scope.$watch(varName,function(){
                    console.log("watch");
                    console.log($scope.payment);
                    console.log($scope);
                    if ($scope[varName]!=undefined){
                        myWatch();
                        callback();
                    }
                });    
            }
            createMyWatch('summary',function(){
                    console.log("printing summary");
                    console.log($scope.summary);
                   
                     
                    var compName=$scope.summary.onwards.CompanyName; 
                    var compNameUpper=compName.toUpperCase();
                    $scope.showReliabilty=(compNameUpper!='PUNBUS' &&  $scope.summary.onwards.CompanyId!='10953' && $scope.summary.onwards.CompanyId!='11854');
                
                    reliability_price=$scope.showReliabilty==true && $scope.isCheckedReliability==true? $scope.summary.onwards.fareDetails.insuranceFees + $scope.summary.return.fareDetails.insuranceFees:0;
                
                    $scope.reliabiltyPrice=reliability_price;
            
                 
            });
            
        }],
        link: function postLink(scope, element, attrs) {}
      }
    
  });
