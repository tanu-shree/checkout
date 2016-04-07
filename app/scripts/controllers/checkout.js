'use strict';

/**
 * @ngdoc function
 * @name newappApp.controller:CheckoutCtrl
 * @description
 * # CheckoutCtrl
 * Controller of the newappApp
 */

angular.module('newappApp')
  .controller('CheckoutCtrl', ['$scope', '$location','$rootScope', 'CheckoutService', 'checkoutDetailData','checkoutConstant','FACEBOOK_CONSTANTS', 'GOOGLE_CONSTANTS', function ($scope, $location,$rootScope, CheckoutService,  checkoutDetailData,checkoutConstant,FACEBOOK_CONSTANTS, GOOGLE_CONSTANTS) {
      
    $scope.token='8134bb03f3a22101e53c083939b1f653_8091317_605';
    $scope.tabInfo = false;
    $scope.checkoutDetailsData = checkoutDetailData;
    $scope.customerDetail = {name:null,email:null,mobile:"",coupon:"",discount:0};
    $scope.isCheckedReliability = true;
    
    CheckoutService.getOrderDetails(8001).then(function (response) {
        checkoutDetailData.details = response.data;
        console.log(checkoutDetailData);

        $scope.CheckoutDetail = response.data.order;
        console.log($scope.CheckoutDetail);
        $scope.customerDetail = {name:$scope.CheckoutDetail.customer_details.name, email: $scope.CheckoutDetail.customer_details.email, mobile: $scope.CheckoutDetail.customer_details.contactNo };
        
        $scope.$broadcast('checkout', $scope.CheckoutDetail);
        
    });  
    CheckoutService.getPaymentOptions().then(function(response){
        $scope.PaymentOptions=response.data.payment;
        checkoutDetailData.paymentOptions=$scope.PaymentOptions;
        console.log("1");
        
    });


    function formatDate(strDate) {
        var monthNames = ["Jan", "Feb", "Mar","Apr", "May", "Jun", "Jul","August", "Sep", "Oct","Nov", "Dec"];

        var arDate = strDate.split("-");
        return (arDate[2] + " " + (monthNames[new Date(arDate[1]).getMonth()]) + ", " + arDate[0]);

    }
      
      
   
    
}]);
