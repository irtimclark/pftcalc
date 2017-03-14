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
});
