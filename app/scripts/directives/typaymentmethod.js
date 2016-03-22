'use strict';

/**
 * @ngdoc directive
 * @name newappApp.directive:tyPaymentMethod
 * @description
 * # tyPaymentMethod
 */
angular.module('newappApp')
    .directive('tyPaymentMethod',  ['BookingService','PayPalAmountService','JusPayApplicableService','PaymentGatewayService','GetOrderStatusService','UpdateOrderService', 'CreateOrderService','DeleteCardService', 'NetBank', 'Wallet', 'CashCard','$locale', function (BookingService, PayPalAmountService, JusPayApplicableService, PaymentGatewayService, GetOrderStatusService, UpdateOrderService, CreateOrderService,DeleteCardService, NetBank, Wallet, CashCard,$locale) {
      return {
        scope: {
            checkout: '=',
            tabinfo:'=',
            customerdetail: '=',
            isCheckReliability:'='
        },
        templateUrl: '/views/paymentmethod.html',
        restrict: 'E',
        replace:true,
        controller: ['$scope','$sce', function ($scope,$sce) {
           
            var ty = ty || {};
            ty.co = {};
            ty.co.constant = {
                CARD: 'debit',
                NETBANKING: 'netbank',
                WALLET: 'wallet',
                INTERNATIONAL:'othercard'
            }
            ty.co.data={
                card_provider: 'unkwn_cc',
                nb_provider: 'icici_nb',
                dc_provider: 'unkwn_dc',
                cash_provider: 'airmo_cashc',
                wallet_provider: 'payu_wallet',
                payu_wallet_provider: 'payu_wallet',
                paytm_wallet_provider: 'paytm_wallet',
                freecharge_wallet_provider: 'freecharge_wallet',
                int_provider: 'paypal_int',
                express_provider: 'juspay'
            }
            ty.co.options = {
                net_bank: 'nb',
                debit_card: 'dc',
                credit_card: 'cc',
                wallet:'wallet',
                cash_card: 'cashc',
                int:'int',
                express:'express'
            }
            ty.co.merchantID = "";
            var net_bank = "";
            var wallet = "";
            var cash_card = "";
            var int = "";
            var dc_atm="";
            var card="";
            
            $scope.currentYear = new Date().getFullYear();
            $scope.currentMonth = new Date().getMonth() + 1;
            $scope.months = $locale.DATETIME_FORMATS.MONTH;
            $scope.ccinfo = {type:undefined};
            
            $scope.tabDetails={'debit':'Debit / Credit Card','netbank':'Net Banking','wallet':'Walllet','othercard':'Other Payment'};
            $scope.data = { repeatSelect: '' };
            //setDefault();
            getPayPalAmount();
            $scope.cardInput = false;
            $scope.savedCardInput = true;
            $scope.selected = "debit";
            $scope.NetBank = NetBank;
            $scope.Wallet = Wallet;
            $scope.CashCard = CashCard;
            
            
            $scope.selectedOption = function (e) {
                $scope.selected = e;
                changeTab($scope.selected);
            };
            
            $scope.isSelected = function (item) {
                if (item == $scope.selected) {
                    return true;
                }
                return false;
            };
            $scope.showCardInput = function () {
                $scope.cardInput = true;
                $scope.savedCardInput = false;
                setPayment(ty.co.options.credit_card,$scope.ccinfo.type);
            };
            
            $scope.selectBank_popular = function (provider) {
                setPayment(ty.co.options.net_bank, provider);
                $scope.data.repeatSelect = null;
                net_bank = provider;
            };
            
            $scope.$on('checkout',function(checkout) {
                $scope.savedCards = $scope.checkout.details.savedCards;
                var i=0;
                for (i = 0; i < $scope.savedCards.length; i++) {
                    $scope.savedCards[i].url = '../static/checkout/images/master.png';
                }
                net_bank = Object.keys($scope.checkout.details.pgOptions.nb.popular)[0];
                wallet = Object.keys($scope.checkout.details.pgOptions.wallet)[0];
                int = Object.keys($scope.checkout.details.pgOptions.int)[0];
                var dc_AtmCards={};
                Object.keys($scope.checkout.details.pgOptions.dc.all).forEach(function (key) { 
                    var dc_provider=key.split("_");
                    if(dc_provider[1]=='atm'){
                        dc_AtmCards[key]=$scope.checkout.details.pgOptions.dc.all[key];
                    }
                });
                
                $scope.dc_AtmCards=dc_AtmCards;
                console.log($scope.dc_AtmCards);
                setDefault();
                function setDefault() {
                    var tab_method="";
                
                    if($scope.checkout.details.savedCards.length>0 && $scope.savedCardInput){
                        tab_method=ty.co.options.express;
                    }
                    else{
                        tab_method=ty.co.options.credit_card;
                    }
                    setPayment(tab_method, ty.co.data.card_provider);
                }
            });
            $scope.cardUrl = "../static/checkout/images/master.png";
            $scope.getValue = function () {
                console.log($scope.netBankOptionSelected);
            }

            $scope.confirmBooking = function () {
                
                console.log("confirm booking clicked");
                var postData = getPostData();
                var browser = detectBrowser();
                executeBooking(postData,browser);
            }

            $scope.selectBank_all = function (bank) {
                setPayment(ty.co.options.net_bank, bank);
                net_bank = provider;
            };
            $scope.isNetBankOptionSelected = function (nbProvider) {
                if (net_bank == nbProvider) {
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
                cash_card="";
                setPayment(ty.co.options.wallet, walProvider);
            };
            $scope.selectCashCard=function(walProvider){
                cash_card = walProvider;
                wallet="";
                setPayment(ty.co.options.cash_card,walProvider);
            };
            $scope.isCashCardOptionSelected = function (walProvider) {
                if (cash_card == walProvider) {
                    return true;
                }
                return false;
            };
            $scope.isInternationalOptionSelected = function (walProvider) {
                if (int == walProvider) {
                    return true;
                }
                return false;
            };
            $scope.selectInternational = function (walProvider) {
                int = walProvider;
                dc_atm="";
                setPayment(ty.co.options.int, walProvider);
            };
            $scope.isDcOtherOptionSelected=function(walProvider){
                if(dc_atm==walProvider){
                    return true;
                }
                return false;
            };
            $scope.selectAtmCard = function (walProvider) {
                dc_atm = walProvider;
                int="";
                setPayment(ty.co.options.debit_card, walProvider);
            };
            

            function getPayPalAmount() {
                PayPalAmountService.getAmount().then(function (response) {
                    if (response.success) {
                        $scope.paypalAmount = response.data.usd;
                    }
                });
            }
            
            function getPostData() {
                var data = {};
                data.token = $scope.checkout.details.orderToken;
                data.pay_method = $scope.method;
                data.pay_provider = $scope.provider;
                //data.discount = "";
                data.customerName = "tanushree";
                console.log($scope.customerdetail);
                data.email = $scope.customerdetail.email;
                data.mobile = $scope.customerdetail.mobile;
                switch ($scope.method) {
                    case ty.co.options.credit_card:
                        setPayment($scope.method,$scope.ccinfo.type);
                        data.pay_provider = $scope.provider;
				        data.cardNo = $scope.ccinfo.securityCode;
				        data.billing_cust_name = $scope.ccinfo.name;
				        data.card_exp_month = $scope.ccinfo.month;
				        data.card_exp_year = $scope.ccinfo.year;
				        data.cardCVV = $scope.ccinfo.cvv;
				        //data.billing_cust_address = $f.find('textarea[name=cc_billingAddress]').val();
				        //data.billing_cust_city = $f.find('input[name=cc_billingCity]').val();
				        //data.billing_cust_state = $f.find('input[name=cc_billingState]').val();
				        //data.billing_cust_pincode = $f.find('input[name=cc_billingPincode]').val();
				        data.paydebug = 'cc';
                        break;
                        
                   /* case ty.co.options.debit_card:
				        data.cardNo = $scope.ccinfo.securityCode;
				        data.billing_cust_name = $scope.ccinfo.name;
				        data.card_exp_month = $scope.ccinfo.month;
				        data.card_exp_year = $scope.ccinfo.year;
				        data.cardCVV = $scope.ccinfo.cvv;
				        data.debit_bank_name = $scope.checkout.details.pgOptions.dc.all[$scope.provider];
				        data.debit_bank_code = $scope.provider;
				        data.paydebug = 'dc';
				        break;*/
                        
                    case ty.co.options.net_bank:
                        data.paydebug = ty.co.options.net_bank;
                        break;
                        
                    case ty.co.options.cash_card:
                        data.paydebug = ty.co.options.cash_card;
                        break;
                        
                    default:
                        data.paydebug = 'unknown-' + data.pay_method;
                        break;
                }
                if ($scope.isCheckReliability == true)
                {
                    data.insuranceFee = $scope.checkout.details.fareDetails.insuranceFee;
                }
                return data;
            }

            function changeTab(tab) {
                var tab_method="";
                var tab_provider="";
                switch (tab) {
                    case ty.co.constant.CARD: 
                        if($scope.checkout.details.savedCards.length>0 && $scope.savedCardInput){
                            tab_method=ty.co.options.express;
                        }
                        else{
                            tab_method=ty.co.options.credit_card;
                        }
                        
                        tab_provider=$scope.ccinfo.type;
                        setPayment(tab_method,tab_provider);
                        console.log("Printing "+$scope.method+"  "+$scope.provider);
                        break;
                    case ty.co.constant.NETBANKING: 
                        tab_method = ty.co.options.net_bank;
                        tab_provider = net_bank;
                        setPayment(tab_method, tab_provider);
                        break;
                    case ty.co.constant.WALLET:
                        if (wallet != "") {
                            tab_method = ty.co.options.wallet;
                            tab_provider = wallet;
                        }
                        else if (cash_card != "") {
                            tab_method = ty.co.options.cash_card;
                            tab_provider = cash_card;
                        }
                        setPayment(tab_method, tab_provider);
                        break;
                    case ty.co.constant.INTERNATIONAL:
                        if(dc_atm!=""){
                            tab_method = ty.co.options.debit_card;
                            tab_provider = dc_atm;
                        }
                        if(int!=""){
                            tab_method = ty.co.options.int;
                            tab_provider = int;
                        }
                        setPayment(tab_method, tab_provider);
                        break;
                        
                }
            }
            function setPayment(tab_method, tab_provider) {
                $scope.method = tab_method;
                $scope.provider = tab_provider;
            }
            

            function executeBooking(postData,browser) {
                console.log("prinitng post data");
                console.log(postData);
                var apiurl="";
                if($scope.checkout.details.order_type==2){
                    apiurl="/api/transaction/checkoutHotels/";
                }
                else{
                    apiurl="/api/transaction/checkout/";
                }
                BookingService.execute(apiurl, $scope.checkout.details.orderToken,  $scope.method, $scope.provider, browser, postData).then(function (response) {
                    console.log(response);
                    $scope.BookingResponse = response;
                    checkForJuspay();
                });
               
            }

            function checkForJuspay() {
                
                JusPayApplicableService.getApplicability().then(function (response) {
                    console.log("jus pay appl");
                    console.log(response);
                    if (response.data.applicable) {
                        console.log("applicable");
                        ty.co.merchantID = response.data.config.merchant_id;
                        var pay_method = $scope.method;
                        
                        if( getIndex($scope.method,response.data.config.applicable_tabs)>=0 && $scope.BookingResponse.data.data.pgData.params.cardOption!= 'NonMoto' && $scope.BookingResponse.data.data.pgData.pg!=='ccavenue'){
                            getOrderStatus();
                        }
                        else{
                            handleHoldRetryResponse();
                        }
                        
                        
                    }
                    else {
                        handleHoldRetryResponse();
                    }
                });
               
            }
            
            function getIndex(data,arr){
                var i=0;
                for(i=0;i<arr.length;i++){
                    if(arr[i]==data){
                        return i;
                    }
                }
                return -1;
            }
            function getOrderStatus(){
                GetOrderStatusService.execute($scope.BookingResponse.data.data.pgData.params.txnid).then(function(response){
                    if(response.data.merchant_id){
                        updateOrder();
                    }
                    else{
                        createOrder();
                    }
                });
            }
            
            function updateOrder(){
                var saveCardInLocker = 0;
                if($scope.isCheckedSaveCard==true)
                {
    	           if($scope.BookingResponse.data.data.pgData.pg != 'ccavenue')
    	           saveCardInLocker = 1;
                }
                var data={
                    orderid:$scope.checkout.detail.pgData.params.txnid,
                    fin_amount:$scope.checkout.detail.pgData.params.amount };
                
                UpdateOrderService.execute(data).then(function(response){
                    if(response.data.success){
                        updateJuspayForm(ty.co.merchantID,payment_method,response.data.order_id);
                        addJuspaySubmitListener();
                        submitJusPayform();
                    }
                    else{
                        if($scope.method!='express'){
                            handleHoldRetryResponse();
                        }
                    }
                });
            }
            
            function updateJuspayForm(merchantID,payment_method,orderID){
                if(payment_method == 'cc')
		        {
			         var cardNo = $scope.ccinfo.securityCode;
			         var billingCustName = $scope.ccinfo.name;
			         var cardCVV = $scope.ccinfo.cvv;
			         var cardExpMonth = $scope.ccinfo.month;
			         var cardExpYear  = $scope.ccinfo.year;

		        }
                else if(payment_method=='express')
                {
                    //To be decided
			        // var cardCVV = $('#checkoutForm').find('input[name=saved_cardCVV]').val();
			         //var cardToken = $('#checkoutForm').find('.saved-card:checked').attr('data-cardtoken');
                }
                
                if(payment_method == 'cc')
		        {
		              $scope.merchant_id=merchantID;
		              $scope.order_id=orderID;
		              $scope.card_number=cardNo;
		              $scope.name_on_card=billingCustName;
		              $scope.card_exp_month=cardExpMonth;
		              $scope.card_exp_year=cardExpYear;
		              $scope.security_code=cardCVV;	
		              if(($scope.isSelected('debit') && $scope.isCheckedSaveCard)) {
                          console.log("selected");
		    	         $scope.juspay_locker_save= true;	
                        }
                    
		    	
		       }
		      else if(payment_method == 'express')
		       {
			         //Update the express checkout form.
		              $scope.merchant_id_express=merchantID;
		              $scope.order_id_express=orderID;
                      $scope.card_token_express=cardToken;
		              $scope.security_code_express=cardCVV;
		      }
            }
            
            function addJuspaySubmitListener(){
                if($scope.method=='express'){
                    Juspay.Setup({
                    payment_form: "#juspay_payment_form_express",
                    success_handler: function(status) {},
                    error_handler: function(error_code, error_message, bank_error_code,bank_error_message, gateway_id) {}
                    });
                }
                else{
                    Juspay.Setup({
                    payment_form: "#juspay_payment_form",
                    success_handler: function(status) {},
                    error_handler: function(error_code, error_message, bank_error_code,bank_error_message, gateway_id) {}
                    });	
                }
            }
            
            function submitJuspayForm(){
                if($scope.method=='express'){
                    document.getElementById("juspay_payment_form_express").submit();
                }
                else{
                    
                    document.getElementById("juspay_payment_form").submit();
                }
            }
            
            function createOrder(){
                var saveCardInLocker = 0;
                if($scope.isCheckedSaveCard==true)
                {
    	           if($scope.BookingResponse.data.data.pgData.pg != 'ccavenue')
    	           saveCardInLocker = 1;
                }
                var data={token:$scope.checkout.details.orderToken,
                         orderid:$scope.BookingResponse.data.data.pgData.params.txnid,
                         method: $scope.BookingResponse.data.data.pgData.params.udf1 != 'undefined'?  $scope.BookingResponse.data.data.pgData.params.udf1 : $scope.method,
                         bank:$scope.BookingResponse.data.data.pgData.params.udf2 != 'undefined'? $scope.BookingResponse.data.data.pgData.params.udf2 : $scope.provider,
                         customerName: $scope.BookingResponse.data.data.pgData.params.firstname != 'undefined' ? $scope.BookingResponse.data.data.pgData.params.firstname : "tanushree",
                         product_info:$scope.BookingResponse.data.data.pgData.params.productinfo != 'undefined' ? $scope.BookingResponse.data.data.pgData.params.productinfo : 'Travelyaari Bus Booking',
                         save_card:saveCardInLocker,
                         use_pg:$scope.BookingResponse.data.data.pgData.pg == 'ccavenue' ? 12 : 12,
                         card_brand:$scope.ccinfo.type,
                         fallback_email:$scope.customerdetail.email,
                         fallback_mobile:$scope.customerdetail.mobile,
                         fin_amount:$scope.BookingResponse.data.data.pgData.params.amount,
                         calling_device:'desktop'};
                
                CreateOrderService.execute(data).then(function(response){
                    console.log("create service response");
                    console.log(response);
                    if(response.data.success){
                        updateJuspayForm(ty.co.merchantID,$scope.method,response.data.order_id);
                        addJuspaySubmitListener();
                        submitJusPayform();
                    }
                    else{
                        if($scope.method!='express'){
                            handleHoldRetryResponse();
                        }
                    }
                });
            }
            
            function deleteCardAndPay(){
            
            }
            function handleHoldRetryResponse() {
                console.log("Printing booking response");
                console.log($scope.BookingResponse);
                if($scope.BookingResponse.data.success==true){
                    if ($scope.BookingResponse.data.data.pgFormData) {
                        
                        /*var pgData=$scope.BookingResponse.data.data.pgData.params;
                        console.log($scope.BookingResponse.data.data.pgData.api);
                        PaymentGatewayService.execute($scope.BookingResponse.data.data.pgData.api,pgData).then(function (response) {
                            console.log(response);
                            $scope.PaymentGateway = response;
                        
                        });*/
                        
                        $scope.pgSubmission=$sce.trustAsHtml($scope.BookingResponse.data.data.pgFormData);
                        console.log(document.getElementById("paymentForm"));
			            document.getElementById("paymentForm").submit();
                    } else if ($scope.BookingResponse.data.data.method == 'express') {
                        //ty.co.expressCheckout();
                    } else {
                        window.location = $scope.BookingResponse.data.data.redirectUrl;
                    }
                }
                else{
                    if($scope.BookingResponse.data.data.forceRedirect){
                         window.location = $scope.BookingResponse.data.data.redirectUrl;
			             return false;
                    }
                    if($scope.BookingResponse.data.data.error.code==562){
                    
                    }
                    else { //seatchart not available, redirect to srp
			             window.location = $scope.BookingResponse.data.data.redirectUrl;
		            }
                }
                
            }
            

            function detectBrowser() {

                var browser = "";
                // Opera 8.0+
                var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
                // Firefox 1.0+
                var isFirefox = typeof InstallTrigger !== 'undefined';
                // At least Safari 3+: "[object HTMLElementConstructor]"
                var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
                // Internet Explorer 6-11
                var isIE = /*@cc_on!@*/false || !!document.documentMode;
                // Edge 20+
                var isEdge = !isIE && !!window.StyleMedia;
                // Chrome 1+
                var isChrome = !!window.chrome && !!window.chrome.webstore;
                // Blink engine detection
                var isBlink = (isChrome || isOpera) && !!window.CSS;
                if (isChrome) {
                    browser = "chrome";
                }
                else if (isFirefox) {
                    browser = "firefox";
                }
                else if (isIE) {
                    browser = "ie";
                }
                else if (isEdge) {
                    browser = "edge";
                }
                else if (isSafari) {
                    browser = "safari";
                }
                else if (isOpera) {
                    browser = "opera";
                }
                return browser;
            }
            //replace whitespaces from card num string
	       function cleanCardNumber(n) {
		      if(n) {
			     return n.replace(/\s+/g, '');
		      } else {
			     return n;
              }
	       }
            
        }],
        link: function postLink(scope, element, attrs) { }
    };
    
  }]);
