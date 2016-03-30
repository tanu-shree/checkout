'use strict';

/**
 * @ngdoc function
 * @name newappApp.controller:CheckoutCtrl
 * @description
 * # CheckoutCtrl
 * Controller of the newappApp
 */
var url = "http://dev.travelyaari.com";
angular.module('newappApp')
  .controller('CheckoutCtrl', ['$scope', '$location', 'CheckoutService', 'checkoutDetailData','checkoutConstant', function ($scope, $location, CheckoutService,  checkoutDetailData,checkoutConstant) {
    
    $scope.tabInfo = false;
    $scope.checkoutDetailsData = checkoutDetailData;
    $scope.customerDetail = {email:"",mobile:""};
    $scope.isCheckedReliability = true;
    
    CheckoutService.getOrderDetails(8001).then(function (response) {
        checkoutDetailData.details = response.data;
        console.log(checkoutDetailData);

        $scope.CheckoutDetail = response.data.order;
        console.log($scope.CheckoutDetail);
        $scope.customerDetail = { email: $scope.CheckoutDetail.customer_details.email, mobile: $scope.CheckoutDetail.customer_details.contactNo };
        
        $scope.$broadcast('checkout', $scope.CheckoutDetail);
        
    });  
    CheckoutService.getPaymentOptions().then(function(response){
        $scope.PaymentOptions=response.data.payment;
        checkoutDetailData.paymentOptions=$scope.PaymentOptions;
        console.log("1");
        $scope.$broadcast(checkoutConstant.PAYMENT);
    });


    function formatDate(strDate) {
        var monthNames = ["Jan", "Feb", "Mar","Apr", "May", "Jun", "Jul","August", "Sep", "Oct","Nov", "Dec"];

        var arDate = strDate.split("-");
        return (arDate[2] + " " + (monthNames[new Date(arDate[1]).getMonth()]) + ", " + arDate[0]);

    }

}]);
