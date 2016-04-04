'use strict';

describe('Service: CARDCONSTANT', function () {

  // load the service's module
  beforeEach(module('newappApp'));

  // instantiate service
  var CARDCONSTANT;
  beforeEach(inject(function (_CARDCONSTANT_) {
    CARDCONSTANT = _CARDCONSTANT_;
  }));

  it('should do something', function () {
    expect(!!CARDCONSTANT).toBe(true);
  });

});
