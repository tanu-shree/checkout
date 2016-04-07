'use strict';

/**
 * @ngdoc overview
 * @name newappApp
 * @description
 * # newappApp
 *
 * Main module of the application.
 */
angular
  .module('newappApp', [
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'resource.loader',
    'user.auth'
  ])
  .config(['$routeProvider','$locationProvider','userauthProvider',function ($routeProvider,$locationProvider,userauthProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/checkout.html',
        controller: 'CheckoutCtrl',
        controllerAs: 'checkout'
      })
      .otherwise({
        redirectTo: '/'
      });
      
      $locationProvider.html5Mode(true);
      
      userauthProvider.setFbSettings({
            appId: '1168184359859767',
            cookie: true,
            xfbml: true,
            version: 'v2.5'
        });

        userauthProvider.setFbLoginRtnSettings({
            scope: 'user_photos,email,publish_actions,public_profile',
            return_scopes: true
        });

        userauthProvider.setGoogleSettings({
            client_id: '987460405552-9bbspnouuev4pgvg7gms3m464bq8b6df.apps.googleusercontent.com',
            cookiepolicy: 'single_host_origin'
        });
      
       
      
  }]);

