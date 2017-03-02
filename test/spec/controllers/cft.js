'use strict';

describe('Controller: CftCtrl', function () {

  // load the controller's module
  beforeEach(module('pftcalcApp'));

  var CftCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CftCtrl = $controller('CftCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    //expect(CftCtrl.awesomeThings.length).toBe(3);
  });
});
