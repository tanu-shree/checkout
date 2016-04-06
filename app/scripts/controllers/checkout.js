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
    
}]);
