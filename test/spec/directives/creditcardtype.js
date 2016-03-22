'use strict';

describe('Directive: creditCardType', function () {

  // load the directive's module
  beforeEach(module('newappApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<credit-card-type></credit-card-type>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the creditCardType directive');
  }));
});
