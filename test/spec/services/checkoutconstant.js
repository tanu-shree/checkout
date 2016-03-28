'use strict';

describe('Service: checkoutConstant', function () {

  // load the service's module
  beforeEach(module('newappApp'));

  // instantiate service
  var checkoutConstant;
  beforeEach(inject(function (_checkoutConstant_) {
    checkoutConstant = _checkoutConstant_;
  }));

  it('should do something', function () {
    expect(!!checkoutConstant).toBe(true);
  });

});
