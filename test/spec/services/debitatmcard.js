'use strict';

describe('Service: debitAtmCard', function () {

  // load the service's module
  beforeEach(module('newappApp'));

  // instantiate service
  var debitAtmCard;
  beforeEach(inject(function (_debitAtmCard_) {
    debitAtmCard = _debitAtmCard_;
  }));

  it('should do something', function () {
    expect(!!debitAtmCard).toBe(true);
  });

});
