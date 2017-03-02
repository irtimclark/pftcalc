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
    jasmine.getJSONFixtures().fixturesPath = '/base/app/data';
    $httpBackend.whenGET('data/matrix.json').respond(getJSONFixture('matrix.json'));
  }));

  it('should do something', function () {
    expect(!!pftCalculatorService).toBe(true);
  });

  it('should return the score matrix', function (done) {
    pftCalculatorService.getScoreMatrix().then(function (stuff) {
      expect(stuff["3MILERUN"].F.LowAlt).toBeDefined();
      done();
    });
    $httpBackend.flush();
  });

  it('should return first class for a good score', function (done) {
    pftCalculatorService.getScoreMatrix().then(function () {
      //self.calculateScore = function(gender, age, atAltitude, rowScore, runScore, pullUps, pushUps, crunches) {
      var result = pftCalculatorService.calculateScore("M",17,false,null,60*15,25,null,100);
      expect(result.Class).toBe('1st Class');
      done();
    });
    $httpBackend.flush();
  });

  it('should return fail for any failing score', function (done) {
    pftCalculatorService.getScoreMatrix().then(function () {
      //self.calculateScore = function(gender, age, atAltitude, rowScore, runScore, pullUps, pushUps, crunches) {
      var result = pftCalculatorService.calculateScore("M",17,false,null,60*15,25,null,8);
      expect(result.Class).toBe('Failed');
      done();
    });
    $httpBackend.flush();
  });

});
