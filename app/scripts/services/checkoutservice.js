'use strict';

/**
 * @ngdoc service
 * @name newappApp.checkoutservice
 * @description
 * # checkoutservice
 * Service in the newappApp.
 */
angular.module('newappApp')
  .service('checkoutservice', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function
  });

angular.module('newappApp').factory('CheckoutDetailService', ['$http', '$q', function ($http, $q) {
        var details = {
            getCheckoutInfo: function () {
                var deferred = $q.defer();
                $http({
                    'cache': true,
                    'url': url + '/api/transaction/getCheckoutDetails?orderId=493',
                    'method': 'GET'
                }).then(function (data) {
                    deferred.resolve(data);
                });

                return deferred.promise;
            }
        };

        return details;
}]);


angular.module('newappApp').factory('BookingService', ['$http', '$q', function ($http, $q) {
    var booking = {
        execute: function (apiurl,orderToken,method,provider,browser,postData) {
            var deferred = $q.defer();
            $http({
                
                'url': url + apiurl+'?o=' + orderToken + '&b=' + browser + '&ajx=1&pay_method=' + method + '&pay_provider=' + provider + '&ver=v2',
                'method': 'POST',
                'data':postData,
                
                'headers':{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'},
                'transformRequest': function(obj) {
                    var str = [];
                    for(var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                }
                
            }).then(function (data) {
                deferred.resolve(data);
            });

            return deferred.promise;
        }
    };

    return booking;
}]);

angular.module('newappApp').factory('PayPalAmountService', ['$http', '$q', function ($http, $q) {
    var booking = {
        getAmount: function () {
            var deferred = $q.defer();
            $http({
                'cache': true,
                'url': url+'/api/transaction/paypalAmount/',
                'method': 'GET'
                
            }).then(function (data) {
                deferred.resolve(data);
            });

            return deferred.promise;
        }
    };

    return booking;
}]);

angular.module('newappApp').factory('JusPayApplicableService', ['$http', '$q', function ($http, $q) {
    var booking = {
        getApplicability: function () {
            var deferred = $q.defer();
            $http({
                'cache': true,
                'url': url + '/api/juspay/isJuspayApplicable/',
                'method': 'GET'

            }).then(function (data) {
                deferred.resolve(data);
            });

            return deferred.promise;
        }
    };

    return booking;
}]);

angular.module('newappApp').factory('PaymentGatewayService', ['$http', '$q', function ($http, $q) {
    var booking = {
        execute: function (pg,postData) {
            var deferred = $q.defer();
            $http({
                'url': pg,
                'method': 'POST',
                'data':postData,
                
                'headers':{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'},
                'transformRequest': function(obj) {
                    var str = [];
                    for(var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                }

            }).then(function (data) {
                deferred.resolve(data);
            });

            return deferred.promise;
        }
    };

    return booking;
}]);

angular.module('newappApp').factory('GetOrderStatusService', ['$http', '$q', function ($http, $q) {
    var booking = {
        execute: function (orderId) {
            var deferred = $q.defer();
            $http({
                'cache': true,
                'url': url+'/api/juspay/getOrderStatus?orderid='+orderId,
                'method': 'GET'
                
                
            }).then(function (data) {
                deferred.resolve(data);
            });

            return deferred.promise;
        }
    };

    return booking;
}]);

angular.module('newappApp').factory('UpdateOrderService', ['$http', '$q', function ($http, $q) {
    var booking = {
        execute: function (postData) {
            var deferred = $q.defer();
            $http({
                'url': url+'/api/juspay/updateOrder/',
                'method': 'POST',
                'data':postData,
                'headers':{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'},
                'transformRequest': function(obj) {
                    var str = [];
                    for(var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                }
                
            }).then(function (data) {
                deferred.resolve(data);
            });

            return deferred.promise;
        }
    };

    return booking;
}]);

angular.module('newappApp').factory('CreateOrderService', ['$http', '$q', function ($http, $q) {
    var booking = {
        execute: function (postData) {
            var deferred = $q.defer();
            $http({
                'url': url+'/api/juspay/createOrder/',
                'method': 'POST',
                'data':postData,
                'headers':{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'},
                'transformRequest': function(obj) {
                    var str = [];
                    for(var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                }
                
            }).then(function (data) {
                deferred.resolve(data);
            });

            return deferred.promise;
        }
    };

    return booking;
}]);

angular.module('newappApp').factory('DeleteCardService', ['$http', '$q', function ($http, $q) {
    var booking = {
        execute: function (postData) {
            var deferred = $q.defer();
            $http({
                'url': url+'/api/juspay/deleteCard/',
                'method': 'POST',
                'data':postData,
                'headers':{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'},
                'transformRequest': function(obj) {
                    var str = [];
                    for(var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                }
                
            }).then(function (data) {
                deferred.resolve(data);
            });

            return deferred.promise;
        }
    };

    return booking;
}]);
