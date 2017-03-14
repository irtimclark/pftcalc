'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('pftcalcApp'));

  var MainCtrl,
    $httpBackend,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope,_$httpBackend_) {
    scope = $rootScope.$new();
    $httpBackend = _$httpBackend_;
    jasmine.getJSONFixtures().fixturesPath = '/base/app/data';
    $httpBackend.whenGET('data/matrix.txt').respond(getJSONFixture('matrix.txt'));
    MainCtrl = $controller('MainCtrl as vm', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should return the correct css class for a score', function () {
    expect(MainCtrl.getCssClassForScore(0)).toBe('progress-bar-danger');
  });

  it('should clear out a row score when the age changes to less than 46', function () {
    MainCtrl.input.age='46';
    MainCtrl.input.rowTime='12:20';
    MainCtrl.input.age='17';
    scope.$digest();
    expect(MainCtrl.input.rowTime).toBe('');
  });
});
