'use strict';

describe('Directive: tyWalletOffers', function () {

  // load the directive's module
  beforeEach(module('newappApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<ty-wallet-offers></ty-wallet-offers>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the tyWalletOffers directive');
  }));
});
