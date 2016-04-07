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
            tabinfo:'=',
            token:'=',
            customerdetail:'=',
            orderid:'='
        },
        templateUrl: '/views/paymentmethod.html',
        restrict: 'E',
        controller: ['$scope','$sce','$window','$interval','checkoutConstant','CheckoutService', 'NetBank', 'Wallet','OtherOption','Card', function ($scope,$sce,$window,$interval,checkoutConstant,CheckoutService, NetBank, Wallet,OtherOption,Card) {
    
            
            var wallet="";
            var net_bank="";
            var op="";
            var periodicIntervalForPgSubmit;
            $scope.walletPopup=false;
            $scope.CONSTANT=checkoutConstant;
            $scope.data = { repeatSelect: '' };
            $scope.currentYear = new Date().getFullYear();
            $scope.currentMonth = new Date().getMonth() + 1;
            $scope.ccinfo = {type:undefined};
            $scope.selected = $scope.CONSTANT.CREDIT_CARD;
            $scope.Wallet=Wallet;
            $scope.NetBank=NetBank;
            $scope.OtherOption=OtherOption;
            $scope.Card=Card;
            $scope.showSavedCard=false;
            //$scope.deletedCards=[];
            $scope.selectedCard={card_token:'',card_fingerprint:'',card_brand:'',card_type:'',cvv:[]};
            $scope.walletSubtitle=[];
            $scope.walletMsg=[];
            $scope.walletTnc=[];
            
            checkIfUserIsLoogedIn();
            function createMyWatch(varName,callback){
                var myWatch=$scope.$watch(varName,function(newval,oldval){
                    
                    if ($scope[varName]!=undefined){
                        myWatch();
                        callback();
                    }
                    
                },true);    
            }
            createMyWatch('payment',function(){
                wallet=Object.keys($scope.payment.options.wallet.previlaged)[0];
                net_bank=Object.keys($scope.payment.options.nb.popular)[0];
                op=Object.keys($scope.payment.options.op.all)[0];
                $scope.test=$scope.payment.offers.wallet.paytm_wallet[0].tnc;
                
                prepareOffers();
                setPayment($scope.selected,'');
            });
            
            $scope.selectedOption = function (e) {
                $scope.selected = e;
                $scope.walletPopup=false;
                if($scope.SavedCards!=null){
                    $scope.showSavedCard=true;
                    
                } 
                changeTab($scope.selected);
            };
            
            $scope.isSelected = function (item) {
                if (item === $scope.selected) {
                    return true;
                }
                return false;
            };
            $scope.isWalletOptionSelected = function (walProvider) {
                if (wallet === walProvider) {
                    return true;
                }
                return false;
            };
            $scope.selectWallet = function (walProvider) {
                wallet = walProvider;
                setPayment($scope.selected, walProvider);
                showPopupIfApplicable(walProvider);
            };
            $scope.isWalletOptionSelected = function (walProvider) {
                if (wallet === walProvider) {
                    return true;
                }
                return false;
            };
            $scope.isNetBankOptionSelected = function (nbProvider) {
                if (net_bank === nbProvider) {
                    return true;
                }
                return false;
            };
            $scope.selectBank_all = function (bank) {
                setPayment($scope.selected, bank);
                net_bank = bank;
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
                if (op === opProvider) {
                    return true;
                }
                return false;
            };
            $scope.removeSavedCard=function(savedCard){
                
                if ($window.confirm("Do you want to continue?"))
                $scope.result = "Yes";
                else
                $scope.result = "No";
                
                if($scope.result==="Yes"){
                    var postData={card_token:savedCard.card_token,card_fingerprint:savedCard.card_fingerprint};
                     CheckoutService.removeSavedCards(postData).then(function(response){
                        if(response.data.delete===true){
                           // $scope.deletedCards.push(response.data.card_token);
                            callSavedCardService();
                        }  

                    });
                    
                }
            };
            $scope.selectCard=function(savedCard){
                $scope.selectedCard.card_token=savedCard.card_token;
                $scope.selectedCard.card_fingerprint=savedCard.card_fingerprint;
                $scope.selectedCard.card_brand=savedCard.card_brand;
                $scope.selectedCard.card_type=savedCard.card_type;
                setSavedCardProvider($scope.selectedCard.card_brand,$scope.selectedCard.card_type);
                console.log($scope.method+" "+$scope.provider);
                console.log($scope.selectedCard);
            };
            
           
             
            $scope.checkIfSelectedInData=function(selected,arr){
                    
                for(var key in arr) {
                    if((key.localeCompare(selected))===0) {

                        return 1;
                    }
                }
                return -1;
            };
            
            $scope.confirmBooking = function () {
                if($scope.tabForm.$valid){
                    console.log("entered");
                    var postData = getPaymentPostData();
                    
                    var browser = "";//detectBrowser();
                    executeBooking(postData,browser);
                    //addJuspaySubmitListener();
                    //submitJuspayForm();
                }
            };
            
            $scope.addMoreCard=function(){
                $scope.showSavedCard=false;
                setPayment($scope.CONSTANT.CREDIT_CARD,'');
            }
              
            $scope.$on(checkoutConstant.LOGGED_IN,function(){
                console.log("method called");
                callSavedCardService();
            });
            
            
            function showPopupIfApplicable(walProvider){
               
                if($scope.checkIfSelectedInData(walProvider,$scope.walletTnc)===1)
                    $scope.walletPopup=true;
            };
            
        
            
            function prepareOffers(){
                var todayDate=new Date(); 
                for(var key in $scope.payment.offers.wallet){
                    var data=$scope.payment.offers.wallet[key];
                    for(var i=0;i<data.length;i++){
                        var validFrom=new Date(data[i].validFrom);
                        var validTill=new Date(data[i].validTill);
                        if(todayDate>=validFrom && todayDate<=validTill){
                            $scope.walletSubtitle[key]=data[i].subtitle;
                            $scope.walletMsg[key]=data[i].msg;
                            $scope.walletTnc[key]=data[i].tnc;
                            break;
                        }
                    }
                }
                console.log("printing wallet msg");
                console.log($scope.walletMsg);
                
            }
            function setPayment(tab_method, tab_provider) {
                $scope.method = tab_method;
                $scope.provider = tab_provider;
            }
        
            function getPaymentPostData(){
                var data={};
                data.token=$scope.token;
                data.pay_method=$scope.method;
                data.pay_provider=$scope.provider;
                if($scope.customerdetail.discount!=0)
                    data.coupon=$scope.customerdetail.coupon;
                else
                    data.coupon="";
                data.customerName=$scope.customerdetail.name;
                data.mobile=$scope.customerdetail.mobile;
                data.email=$scope.customerdetail.email;
                switch ($scope.method) {
                    case $scope.CONSTANT.CREDIT_CARD:
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
				        data.paydebug = $scope.method;
                       
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
                        
                    case $scope.CONSTANT.NETBANK:
                        data.paydebug = $scope.method;
                        break;
                        
                    case $scope.CONSTANT.OTHER_OPTION:
                        data.paydebug = $scope.method;
                        break;
                        
                    default:
                        data.paydebug = 'unknown-' + data.pay_method;
                         if($scope.showSavedCard===true){
                            data.brand=$scope.brand;
                        }
                        break;
                }
                /*if ($scope.isCheckReliability === true)
                {
                    data.insuranceFee = $scope.checkout.details.fareDetails.insuranceFee;
                }*/
                return data;
            } 
            
            
            function changeTab(tab) {
                var tab_method=$scope.selected;
                var tab_provider="";
                switch (tab) {
                    case $scope.CONSTANT.CREDIT_CARD: 
                        
                        if($scope.showSavedCard===true){
                            tab_method=$scope.CONSTANT.EXPRESS;
                            setSavedCardProvider($scope.selectedCard.card_brand,$scope.selectedCard.card_type);
                        }
                        else{
                            tab_provider=$scope.ccinfo.type;
                            setPayment(tab_method,$scope.ccinfo.type);
                        }
                        
                        break;
                    case $scope.CONSTANT.NETBANK: 
                        
                        tab_provider = net_bank;
                        setPayment(tab_method,tab_provider);
                        break;
                    case $scope.CONSTANT.WALLET:
                        
                        tab_provider = wallet;
                        setPayment(tab_method,tab_provider);
                        break;
                    case $scope.CONSTANT.OTHER_OPTION:
                        tab_provider=op;
                        setPayment(tab_method,tab_provider);
                        break;
                        
                }
                
            }
            
            function setSavedCardProvider(brand,card_type)
            {
                switch (brand){
                    case 'VISA':
                        if(card_type === $scope.CONSTANT.EXPRESS_CARD_TYPE_CREDIT)
                            changePaymentOption($scope.CONSTANT.EXPRESS, $scope.CONSTANT.EXPRESS_CC_VISA,brand);
                        else if(card_type === $scope.CONSTANT.EXPRESS_CARD_TYPE_DEBIT)
                            changePaymentOption($scope.CONSTANT.EXPRESS, $scope.CONSTANT.EXPRESS_DC_VISA,brand);
                        else
                            changePaymentOption($scope.CONSTANT.EXPRESS, $scope.CONSTANT.EXPRESS_DEFAULT,brand);
                        break;
                    case 'MASTERCARD':
                        if(card_type === $scope.CONSTANT.EXPRESS_CARD_TYPE_CREDIT)
                            changePaymentOption($scope.CONSTANT.EXPRESS, $scope.CONSTANT.EXPRESS_CC_MASTER,brand);
                        else if(card_type === $scope.CONSTANT.EXPRESS_CARD_TYPE_DEBIT)
                            changePaymentOption($scope.CONSTANT.EXPRESS, $scope.CONSTANT.EXPRESS_DC_MASTER,brand);
                        else
                            changePaymentOption($scope.CONSTANT.EXPRESS, $scope.CONSTANT.EXPRESS_DEFAULT,brand);			    
                        break;
                    case 'AMEX':
                        
                        if(card_type === $scope.CONSTANT.EXPRESS_CARD_TYPE_CREDIT)
                        {
                            changePaymentOption($scope.CONSTANT.EXPRESS, $scope.CONSTANT.EXPRESS_CC_AMEX,brand);
                        }
                        else if(card_type === $scope.CONSTANT.EXPRESS_CARD_TYPE_DEBIT)
                        {
                            changePaymentOption($scope.CONSTANT.EXPRESS, $scope.CONSTANT.EXPRESS_DC_AMEX,brand);
                        }
                        else
                            changePaymentOption($scope.CONSTANT.EXPRESS, $scope.CONSTANT.EXPRESS_DEFAULT,brand);			    
                        break;
                    case 'DISCOVER':
                        if(card_type === $scope.CONSTANT.EXPRESS_CARD_TYPE_CREDIT)
                            changePaymentOption($scope.CONSTANT.EXPRESS, $scope.CONSTANT.EXPRESS_CC_DISCOVER,brand);
                        else if(card_type === $scope.CONSTANT.EXPRESS_CARD_TYPE_DEBIT)
                            changePaymentOption($scope.CONSTANT.EXPRESS, $scope.CONSTANT.EXPRESS_DC_DISCOVER,brand);
                        else
                            changePaymentOption($scope.CONSTANT.EXPRESS, $scope.CONSTANT.EXPRESS_DEFAULT,brand);			    
                        break;
                    case 'UNIONPAY':
                        if(card_type === $scope.CONSTANT.EXPRESS_CARD_TYPE_CREDIT)
                            changePaymentOption($scope.CONSTANT.EXPRESS, $scope.CONSTANT.EXPRESS_CC_UNIONPAY,brand);
                        else if(card_type === $scope.CONSTANT.EXPRESS_CARD_TYPE_DEBIT)
                            changePaymentOption($scope.CONSTANT.EXPRESS, $scope.CONSTANT.EXPRESS_DC_UNIONPAY,brand);
                        else
                            changePaymentOption($scope.CONSTANT.EXPRESS, $scope.CONSTANT.EXPRESS_DEFAULT,brand);		
                        break;
                    case 'JCB':
                        if(card_type === $scope.CONSTANT.EXPRESS_CARD_TYPE_CREDIT)
                            changePaymentOption($scope.CONSTANT.EXPRESS, $scope.CONSTANT.EXPRESS_CC_JCB,brand);
                        else if(card_type === $scope.CONSTANT.EXPRESS_CARD_TYPE_DEBIT)
                            changePaymentOption($scope.CONSTANT.EXPRESS, $scope.CONSTANT.EXPRESS_DC_JCB,brand);
                        else
                            changePaymentOption($scope.CONSTANT.EXPRESS, $scope.CONSTANT.EXPRESS_DEFAULT,brand);			    
                        break;
                    case 'LASER':
                        if(card_type === $scope.CONSTANT.EXPRESS_CARD_TYPE_CREDIT)
                            changePaymentOption($scope.CONSTANT.EXPRESS, $scope.CONSTANT.EXPRESS_CC_LASER,brand);
                        else if(card_type === $scope.CONSTANT.EXPRESS_CARD_TYPE_DEBIT)
                            changePaymentOption($scope.CONSTANT.EXPRESS, $scope.CONSTANT.EXPRESS_DC_LASER,brand);
                        else
                            changePaymentOption($scope.CONSTANT.EXPRESS, $scope.CONSTANT.EXPRESS_DEFAULT,brand);			    
                        break;	
                    case 'DINERSCLUB':
                        if(card_type === $scope.CONSTANT.EXPRESS_CARD_TYPE_CREDIT)
                            changePaymentOption($scope.CONSTANT.EXPRESS, $scope.CONSTANT.EXPRESS_CC_DINERS,brand);
                        else if(card_type === $scope.CONSTANT.EXPRESS_CARD_TYPE_DEBIT)
                            changePaymentOption($scope.CONSTANT.EXPRESS, $scope.CONSTANT.EXPRESS_DC_DINERS,brand);
                        else
                            changePaymentOption($scope.CONSTANT.EXPRESS, $scope.CONSTANT.EXPRESS_DEFAULT,brand);			    
                        break;
                    case 'MAESTRO':
                        if(card_type === $scope.CONSTANT.EXPRESS_CARD_TYPE_CREDIT)
                            changePaymentOption($scope.CONSTANT.EXPRESS, $scope.CONSTANT.EXPRESS_CC_MAESTRO,brand);
                        else if(card_type === $scope.CONSTANT.EXPRESS_CARD_TYPE_DEBIT)
                            changePaymentOption($scope.CONSTANT.EXPRESS, $scope.CONSTANT.EXPRESS_DC_MAESTRO,brand);
                        else
                            changePaymentOption($scope.CONSTANT.EXPRESS, $scope.CONSTANT.EXPRESS_DEFAULT,brand);			    
                        break;			    			    		    			    			    			    			    			
                }
	       }
            function changePaymentOption(method,provider,brand){
                $scope.method=method;
                $scope.provider=provider;
                $scope.brand=brand;
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
            
            function executeBooking(postData,browser) {
                console.log("prinitng post data");
                console.log(postData);
                var apiurl="";
                /*if($scope.checkout.details.order_type===2){
                    apiurl="/api/transaction/checkoutHotels/";
                }
                else{*/
                    apiurl="/api/transaction/checkout/";
                //}
                CheckoutService.book(apiurl, $scope.token,  $scope.method, $scope.provider, browser, postData).then(function (response) {
                    console.log(response);
                    $scope.BookingResponse = response.data;
                    if(response.data.success===true){
                        $scope.pgSubmission=$sce.trustAsHtml($scope.BookingResponse.data.pgFormData);
                       
                        if(document.getElementById("paymentForm")!=null){
                            document.getElementById("paymentForm").submit();
                        }
                        else
			            periodicIntervalForPgSubmit = $interval(pgSubmit, 500);
                        
                    }
                    //checkForJuspay();
                });
               
            }
            
            function pgSubmit(){
                if(document.getElementById("paymentForm")!=null){
                    $interval.cancel(periodicIntervalForPgSubmit);
                    document.getElementById("paymentForm").submit();
                    
                }
            }
            
            function addJuspaySubmitListener(){
                if($scope.method==='express'){
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
                if($scope.method==='express'){
                    console.log(document.getElementById("juspay_payment_form_express"));
                    document.getElementById("juspay_payment_form_express").submit();
                }
                else{
                    
                    document.getElementById("juspay_payment_form").submit();
                }
            }
            
            function callSavedCardService(){
                CheckoutService.getSavedCards().then(function(response){
                    $scope.SavedCards=response.data;
                    //To be deleted
                    $scope.SavedCards=[{"card_token":"e97f4671-b15a-4812-b879-3d6da2456157","card_reference":"bbcdac4bcd8e37118eeaa4f17eb36b73","card_number":"4929-XXXXXXXX-9309","card_isin":"492998","card_exp_year":"2018","card_exp_month":"04","card_type":"CREDIT","card_issuer":"BARCLAYS BANK PLC","card_brand":"VISA","nickname":"","name_on_card":"Test","expired":false,"card_fingerprint":"47sc2ipi182a6umkij41gs78b9"},{"card_token":"e97f4671-b15a-4812-b879-3d6da2456158","card_reference":"bbcdac4bcd8e37118eeaa4f17eb36b73","card_number":"4929-XXXXXXXX-9309","card_isin":"492998","card_exp_year":"2018","card_exp_month":"04","card_type":"CREDIT","card_issuer":"BARCLAYS BANK PLC","card_brand":"AMEX","nickname":"","name_on_card":"Test","expired":false,"card_fingerprint":"47sc2ipi182a6umkij41gs78b9"}];
                    //End
                    if(response.data!=""){
                        $scope.showSavedCard=true;
                        $scope.selectedCard={card_token:response.data[0].card_token,card_fingerprint:response.data[0].card_fingerprint, card_brand:response.data[0].card_brand, card_type: response.data[0].card_type};

                        setSavedCardProvider($scope.selectedCard.card_brand,$scope.selectedCard.card_type);
                    } 
                    else{
                        $scope.showSavedCard=false;
                        $scope.selectedCard={};
                    }

                });
            }
            
            function checkIfUserIsLoogedIn(){
                if(document.cookie.indexOf(checkoutConstant.COOKIE_FOR_LOGGED_IN)>=0){
                    callSavedCardService();
                }
            }
           
        }],
        link: function postLink(scope, element, attrs) { }
    };
    
  });
