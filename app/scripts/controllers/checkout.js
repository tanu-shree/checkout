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
  .controller('CheckoutCtrl', ['$scope', '$location', 'CheckoutDetailService', 'checkoutDetailData', function ($scope, $location, CheckoutDetailService, checkoutDetailData) {
    
    $scope.tabInfo = false;
    $scope.checkoutDetailsData = checkoutDetailData;
    $scope.customerDetail = {email:"",mobile:""};
    $scope.isCheckedReliability = true;
    CheckoutDetailService.getCheckoutInfo().then(function (response) {
        checkoutDetailData.details = response.data;
        console.log(checkoutDetailData);

        $scope.CheckoutDetail = response.data;
        
        $scope.customerDetail = { email: $scope.CheckoutDetail.email, mobile: $scope.CheckoutDetail.mobile };
        if($scope.CheckoutDetail.order_type==1){
            $scope.CheckoutDetail.journeyDate = formatDate($scope.CheckoutDetail.journeyDate);
            if ($scope.CheckoutDetail.extra.return != null) {
                $scope.CheckoutDetail.journeyDate2 = formatDate($scope.CheckoutDetail.journeyDate2);
            }
        }
        $scope.$broadcast('checkout', $scope.CheckoutDetail);
        
    });


    function camelize(str) {
        return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (letter, index) {
            return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
        }).replace(/\s+/g, '');
    }

    function formatDate(strDate) {
        var monthNames = ["Jan", "Feb", "Mar","Apr", "May", "Jun", "Jul","August", "Sep", "Oct","Nov", "Dec"];

        var arDate = strDate.split("-");
        return (arDate[2] + " " + (monthNames[new Date(arDate[1]).getMonth()]) + ", " + arDate[0]);

    }

}]);
