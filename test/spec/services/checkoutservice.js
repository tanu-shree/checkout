'use strict';

describe('Service: checkoutservice', function () {

  // load the service's module
  beforeEach(module('newappApp'));

  // instantiate service
  var checkoutservice;
  beforeEach(inject(function (_checkoutservice_) {
    checkoutservice = _checkoutservice_;
  }));

  it('should do something', function () {
    expect(!!checkoutservice).toBe(true);
  });

});
