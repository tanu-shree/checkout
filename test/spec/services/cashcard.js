'use strict';

describe('Service: CashCard', function () {

  // load the service's module
  beforeEach(module('newappApp'));

  // instantiate service
  var CashCard;
  beforeEach(inject(function (_CashCard_) {
    CashCard = _CashCard_;
  }));

  it('should do something', function () {
    expect(!!CashCard).toBe(true);
  });

});
