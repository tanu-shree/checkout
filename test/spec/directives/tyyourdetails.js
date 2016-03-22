'use strict';

describe('Directive: tyYourDetails', function () {

  // load the directive's module
  beforeEach(module('newappApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<ty-your-details></ty-your-details>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the tyYourDetails directive');
  }));
});
