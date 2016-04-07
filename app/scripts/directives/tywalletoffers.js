'use strict';

/**
 * @ngdoc directive
 * @name newappApp.directive:tyWalletOffers
 * @description
 * # tyWalletOffers
 */
angular.module('newappApp')
  .directive('tyWalletOffers', function () {
    return {
      template: '<div class="wallet-popup" ng-show="show"><div class="wallet-pop-left"><img src="images/{{walletimg}}"></div><div class="wallet-pop-right"><div style="float:left;width:95%;"> <p>{{walletmsg}}</p><span>{{walletsubtitle}}</span></div><div ng-click="walletPopup=false" style="cursor:pointer;">X</div></div><div style="border-bottom: solid 1px #ddd;float:left;width:100%;padding-top:2%;"></div><div class="wallet-pop-body"><p>You have selected {{walletname}}</p> <div class="wallet-terms"><div>Plese read the terms and condition</div><div ng-bind-html="wallettnc"></div></div></div></div>',
      scope:{
        walletname:"=",
        walletmsg:"=",
        wallettnc:"=",
        walletsubtitle:"=",
        walletimg:"=",
        show:"="
      },
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        
      }
    };
  });
