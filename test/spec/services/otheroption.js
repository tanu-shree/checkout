'use strict';

describe('Service: otherOption', function () {

  // load the service's module
  beforeEach(module('newappApp'));

  // instantiate service
  var otherOption;
  beforeEach(inject(function (_otherOption_) {
    otherOption = _otherOption_;
  }));

  it('should do something', function () {
    expect(!!otherOption).toBe(true);
  });

});
