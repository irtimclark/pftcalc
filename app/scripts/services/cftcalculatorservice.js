'use strict';

/**
 * @ngdoc service
 * @name pftcalcApp.cftCalculatorService
 * @description
 * # cftCalculatorService
 * Service in the pftcalcApp.
 */
angular.module('pftcalcApp')
  .service('cftCalculatorService', function ($http, $q, matrixHelper) {
      this.scoreMatrix = null;
      var self = this;
      self.getScoreMatrix = function(){
        var deferred = $q.defer();
        if (self.scoreMatrix !== null) {
          deferred.resolve(self.scoreMatrix);
        }
        else{
          $http.get('data/cftmatrix.json').then(function(response){
            self.scoreMatrix = response.data;
            deferred.resolve(self.scoreMatrix);
          },function(response){
            console.log('Error. Cannot load CFT score matrix!' + response);
            deferred.reject('Error. Cannot load CFT score matrix!');
          });
        }
        return deferred.promise;
      };

      self.calculateScore = function(gender, age, atAltitude, ammoLift, mtc, muf) {
        var result = {
          Class: null,
          AmmoPoints: null,
          MTCPoints: null,
          MUFPoints: null,
          TotalPoints: null
        };

        if (!self.scoreMatrix){
          return result;
        }

        var filterProps = {gender: gender, atAltitude: atAltitude, age: age, scoreMatrix: self.scoreMatrix };
        var calcEventScore = matrixHelper.calculateEventScore;

        result.AmmoPoints = calcEventScore('AMMOLIFT', ammoLift, false, filterProps);
        result.MTCPoints = calcEventScore('MOVECONTACT', mtc, true, filterProps);
        result.MUFPoints = calcEventScore('MOVEFIRE', muf, true, filterProps);
        result.TotalPoints = result.AmmoPoints + result.MUFPoints + result.MTCPoints;

        if (result.AmmoPoints === 0 || result.MTCPoints === 0 || result.MUFPoints === 0){
          result.Class = 'Failed';
        }
        else {
          result.Class = result.TotalPoints >= 235 ? '1st Class' : result.TotalPoints >= 200 ? 'Second Class' : result.TotalPoints >= 120 ? 'Third Class' : 'Fail';
        }
        return result;
      };

      return{
        getScoreMatrix : self.getScoreMatrix,
        calculateScore : self.calculateScore
      };
  });
