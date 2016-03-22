'use strict';

describe('Service: checkoutDetailData', function () {

  // load the service's module
  beforeEach(module('newappApp'));

  // instantiate service
  var checkoutDetailData;
  beforeEach(inject(function (_checkoutDetailData_) {
    checkoutDetailData = _checkoutDetailData_;
  }));

  it('should do something', function () {
    expect(!!checkoutDetailData).toBe(true);
  });

});
