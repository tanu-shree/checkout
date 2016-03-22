'use strict';

describe('Service: Wallet', function () {

  // load the service's module
  beforeEach(module('newappApp'));

  // instantiate service
  var Wallet;
  beforeEach(inject(function (_Wallet_) {
    Wallet = _Wallet_;
  }));

  it('should do something', function () {
    expect(!!Wallet).toBe(true);
  });

});
