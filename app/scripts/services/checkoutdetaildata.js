'use strict';

/**
 * @ngdoc service
 * @name newappApp.checkoutDetailData
 * @description
 * # checkoutDetailData
 * Factory in the newappApp.
 */
angular.module('newappApp')
  .factory('checkoutDetailData', function () {
    var checkoutDetails = {
           'details':[],
            'paymentOptions':[]
        };

        return checkoutDetails;
  });
