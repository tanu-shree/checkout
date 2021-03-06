'use strict';

/**
 * @ngdoc service
 * @name newappApp.checkoutservice
 * @description
 * # checkoutservice
 * Service in the newappApp.
 */

var url = "http://dev.travelyaari.com";
angular.module('newappApp').factory('CheckoutService', ['$http', '$q', function ($http, $q) {
        var details = {
            /*getCheckoutInfo: function () {
                var deferred = $q.defer();
                $http({
                    'cache': true,
                    'url': url + '/api/transaction/getCheckoutDetails?orderId=493',
                    'method': 'GET'
                }).then(function (data) {
                    deferred.resolve(data);
                });

                return deferred.promise;
            },*/
            book: function (apiurl,orderToken,method,provider,browser,postData) {
            var deferred = $q.defer();
            $http({
                
                'url': url + apiurl+'?o=' + orderToken + '&b=' + browser + '&ajx=1&pay_method=' + method + '&pay_provider=' + provider + '&ver=v2',
                'method': 'POST',
                'data':postData,
                
                'headers':{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'},
                'transformRequest': function(obj) {
                    var str = [];
                    for(var p in obj){
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    }
                    return str.join("&");
                }
                
            }).then(function (data) {
                deferred.resolve(data);
            });

            return deferred.promise;
        },
            getPayPalAmount: function () {
            var deferred = $q.defer();
            $http({
                'cache': true,
                'url': url+'/api/transaction/paypalAmount/',
                'method': 'GET'
                
            }).then(function (data) {
                deferred.resolve(data);
            });

            return deferred.promise;
        },
            getJusPayApplicability: function () {
            var deferred = $q.defer();
            $http({
                'cache': true,
                'url': url + '/api/juspay/isJuspayApplicable/',
                'method': 'GET'

            }).then(function (data) {
                deferred.resolve(data);
            });

            return deferred.promise;
        },
            executePg: function (pg,postData) {
            var deferred = $q.defer();
            $http({
                'url': pg,
                'method': 'POST',
                'data':postData,
                
                'headers':{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'},
                'transformRequest': function(obj) {
                    var str = [];
                    for(var p in obj){
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    }
                    return str.join("&");
                }

            }).then(function (data) {
                deferred.resolve(data);
            });

            return deferred.promise;
        },
            getOrderStatus: function (orderId) {
            var deferred = $q.defer();
            $http({
                'cache': true,
                'url': url+'/api/juspay/getOrderStatus?orderid='+orderId,
                'method': 'GET'
                
                
            }).then(function (data) {
                deferred.resolve(data);
            });

            return deferred.promise;
        },
            updateOrder: function (postData) {
            var deferred = $q.defer();
            $http({
                'url': url+'/api/juspay/updateOrder/',
                'method': 'POST',
                'data':postData,
                'headers':{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'},
                'transformRequest': function(obj) {
                    var str = [];
                    for(var p in obj){
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    }
                    return str.join("&");
                }
                
            }).then(function (data) {
                deferred.resolve(data);
            });

            return deferred.promise;
        },
            createOrder: function (postData) {
            var deferred = $q.defer();
            $http({
                'url': url+'/api/juspay/createOrder/',
                'method': 'POST',
                'data':postData,
                'headers':{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'},
                'transformRequest': function(obj) {
                    var str = [];
                    for(var p in obj){
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    }
                    return str.join("&");
                }
                
            }).then(function (data) {
                deferred.resolve(data);
            });

            return deferred.promise;
            },
            getOrderDetails: function (orderId) {
                var deferred = $q.defer();
                $http({
                    'cache': true,
                    'url': url + '/api/v2/transactions/orderDetails?orderId='+orderId,
                    'method': 'GET'
                }).then(function (data) {
                    deferred.resolve(data);
                });

                return deferred.promise;
            },
            getPaymentOptions: function (orderId) {
                var deferred = $q.defer();
                $http({
                    'cache': true,
                    'url': url + '/api/v2/transactions/paymentOptions',
                    'method': 'GET'
                }).then(function (data) {
                    deferred.resolve(data);
                });

                return deferred.promise;
            },
            getSavedCards: function(){
                var deferred = $q.defer();
                $http({
                    'url': url + '/api/juspay/getCards',
                    'method': 'GET'
                }).then(function (data) {
                    deferred.resolve(data);
                });

                return deferred.promise;

            },
            removeSavedCards: function(postData){
                var deferred = $q.defer();
                $http({
                    'url': url + '/api/juspay/deleteCard',
                    'method': 'POST',
                    'data': postData,
                    'headers':{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'},
                    'transformRequest': function(obj) {
                        var str = [];
                        for(var p in obj){
                            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        }
                        return str.join("&");
                    }
                }).then(function (data) {
                    deferred.resolve(data);
                });

                return deferred.promise;

            },
            checkCoupon: function(couponCode,postData){
                var deferred = $q.defer();
                $http({
                    'url': url + '/api/transaction/applyCoupon/?cc='+couponCode,
                    'method': 'POST',
                    'data': postData,
                    'headers':{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'},
                    'transformRequest': function(obj) {
                        var str = [];
                        for(var p in obj){
                            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        }
                        return str.join("&");
                    }
                }).then(function (data) {
                    deferred.resolve(data);
                });

                return deferred.promise;

            },
            checkLogin: function(postData){
                var deferred = $q.defer();
                $http({
                    'url': url + '/api/v2/account/login/',
                    'method': 'POST',
                    'data': postData,
                    'headers':{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'},
                    'transformRequest': function(obj) {
                        var str = [];
                        for(var p in obj){
                            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        }
                        return str.join("&");
                    }
                }).then(function (data) {
                    deferred.resolve(data);
                });

                return deferred.promise;

            }
        };

        return details;
}]);


