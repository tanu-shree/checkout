'use strict';

describe('Filter: cardPattern', function () {

  // load the filter's module
  beforeEach(module('newappApp'));

  // initialize a new instance of the filter before each test
  var cardPattern;
  beforeEach(inject(function ($filter) {
    cardPattern = $filter('cardPattern');
  }));

  it('should return the input prefixed with "cardPattern filter:"', function () {
    var text = 'angularjs';
    expect(cardPattern(text)).toBe('cardPattern filter: ' + text);
  });

});
