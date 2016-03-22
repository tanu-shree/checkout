'use strict';

describe('Service: NetBank', function () {

  // load the service's module
  beforeEach(module('newappApp'));

  // instantiate service
  var NetBank;
  beforeEach(inject(function (_NetBank_) {
    NetBank = _NetBank_;
  }));

  it('should do something', function () {
    expect(!!NetBank).toBe(true);
  });

});
