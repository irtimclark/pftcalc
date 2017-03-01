'use strict';

describe('Service: pftCalculatorService', function () {

  // load the service's module
  beforeEach(module('pftcalcApp'));

  // instantiate service
  var pftCalculatorService,
    $httpBackend;

  beforeEach(inject(function (_pftCalculatorService_, _$httpBackend_) {
    pftCalculatorService = _pftCalculatorService_;
    $httpBackend = _$httpBackend_;
    jasmine.getJSONFixtures().fixturesPath='/base/app/data';
    $httpBackend.whenGET('data/matrix.json').respond(getJSONFixture('matrix.json'));
  }));

  it('should do something', function () {
    expect(!!pftCalculatorService).toBe(true);
  });

  it('should return the score matrix', function (done) {
    pftCalculatorService.getScoreMatrix().then(function(stuff){
      expect(stuff.data["3MILERUN"]["F"]["LowAlt"]).toBeDefined();
      done();
    });
    $httpBackend.flush();
  });

});
