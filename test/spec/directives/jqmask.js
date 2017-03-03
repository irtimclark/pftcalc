'use strict';

describe('Directive: jqmask', function () {

  // load the directive's module
  beforeEach(module('pftcalcApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<jqmask></jqmask>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the jqmask directive');
  }));
});
