'use strict';

/**
 * @ngdoc directive
 * @name newappApp.directive:tyPaymentMethod
 * @description
 * # tyPaymentMethod
 */
angular.module('newappApp')
    .directive('tyPaymentMethod', function () {
      return {
         // require:'^tyYourDetails',
        scope: {
            payment:'=',
            tabinfo:'='
        },
        templateUrl: '/views/paymentmethod.html',
        restrict: 'E',
        controller: ['$scope','$sce','checkoutConstant','CheckoutService', 'NetBank', 'Wallet','OtherOption','$locale', function ($scope,$sce,checkoutConstant,CheckoutService, NetBank, Wallet,OtherOption,$locale) {
           
            
            var wallet="";
            var net_bank="";
            var op="";
            
            $scope.data = { repeatSelect: '' };
            $scope.currentYear = new Date().getFullYear();
            $scope.currentMonth = new Date().getMonth() + 1;
            $scope.months = $locale.DATETIME_FORMATS.MONTH;
            $scope.ccinfo = {type:undefined,cardImage:undefined};
            $scope.selected = 'cc';
            $scope.Wallet=Wallet;
            $scope.NetBank=NetBank;
            console.log($scope);
            $scope.$on(checkoutConstant.PAYMENT,function(){
                console.log("called");
                console.log($scope);
                
            });
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
            createMyWatch('payment',function(){
                wallet=Object.keys($scope.payment.options.wallet.previlaged)[0];
                net_bank=Object.keys($scope.payment.options.nb.popular)[0];
                op=Object.keys($scope.payment.options.op.all)[0];
                
                prepareWalletMsg();
            });
            $scope.selectedOption = function (e) {
                $scope.selected = e;
               // changeTab($scope.selected);
            };
            
            $scope.isSelected = function (item) {
                if (item == $scope.selected) {
                    return true;
                }
                return false;
            };
            $scope.isWalletOptionSelected = function (walProvider) {
                if (wallet == walProvider) {
                    return true;
                }
                return false;
            };
            $scope.selectWallet = function (walProvider) {
                wallet = walProvider;
                setPayment($scope.selected, walProvider);
            };
            $scope.isWalletOptionSelected = function (walProvider) {
                if (wallet == walProvider) {
                    return true;
                }
                return false;
            };
            $scope.isNetBankOptionSelected = function (nbProvider) {
                if (net_bank == nbProvider) {
                    return true;
                }
                return false;
            };
            $scope.selectBank_all = function (bank) {
                setPayment($scope.selected, bank);
                net_bank = provider;
            };
            $scope.selectBank_popular = function (provider) {
                setPayment($scope.selected, provider);
                $scope.data.repeatSelect=null;
                net_bank = provider;
            };
            $scope.selectOtherOption = function (opProvider) {
               
                op = opProvider;
                setPayment($scope.selected, opProvider);
            };
            $scope.isOtherOptionSelected = function (opProvider) {
                if (op == opProvider) {
                    return true;
                }
                return false;
            };
            
            $scope.checkIfInOtherOptionOther=function(opProvider){
                    for(var key in $scope.payment.options.op.others) {
                        if((key.localeCompare(opProvider))==0) {
                            return 1;
                        }
                    }
                    return -1;
            }
            
             $scope.checkIfInWalletPriviledged=function(walProvider){
                    for(var key in $scope.payment.options.wallet.previlaged) {
                        if((key.localeCompare(walProvider))==0) {
                            return 1;
                        }
                    }
                    return -1;
            }
            $scope.subtitle=[];
            $scope.msg=[];
            
            
            function prepareWalletMsg(){
                var todayDate=new Date(); 
                for(var key in $scope.payment.offers.wallet){
                    var data=$scope.payment.offers.wallet[key];
                    for(var i=0;i<data.length;i++){
                        var validFrom=new Date(data[i].validFrom);
                        var validTill=new Date(data[i].validTill);
                        if(todayDate>=validFrom && todayDate<=validTill){
                            $scope.subtitle[key]=data[i].subtitle;
                            $scope.msg[key]=data[i].msg;
                            break;
                        }
                    }
                }
                
            }
            function setPayment(tab_method, tab_provider) {
                $scope.method = tab_method;
                $scope.provider = tab_provider;
            }
        
            
            
        }],
        link: function postLink(scope, element, attrs) { }
    };
    
  });
