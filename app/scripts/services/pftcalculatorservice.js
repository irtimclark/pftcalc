'use strict';

/**
 * @ngdoc service
 * @name pftcalcApp.pftCalculatorService
 * @description
 * # pftCalculatorService
 * Service in the pftcalcApp.
 */
angular.module('pftcalcApp')
  .service('pftCalculatorService', function ($http, $q, matrixHelper) {
      this.scoreMatrix = null;
      var self = this;
      self.getScoreMatrix = function(){
        var deferred = $q.defer();
        if (self.scoreMatrix !== null) {
          deferred.resolve(self.scoreMatrix);
        }
        else{
          $http.get('data/matrix.txt').then(function(response){
            self.scoreMatrix = response.data;
            deferred.resolve(self.scoreMatrix);
          },function(response){
            console.log('Error. Cannot load PFT score matrix!' + response);
            deferred.reject('Error. Cannot load PFT score matrix!');
          });
        }
        return deferred.promise;
      };

      self.calculateScore = function(gender, age, atAltitude, rowScore, runScore, pullUps, pushUps, crunches) {
        var result = {
          Class: null,
          RunPoints: null,
          RowPoints: null,
          CrunchPoints: null,
          TotalPoints: null,
          PullupPoints: null,
          PushupPoints: null,
          PushPullCalculatedPoints: null,
          RunRowCalculatedPoints: null
        };

        if (!self.scoreMatrix){
          return result;
        }

        var filterProps = {gender: gender, atAltitude: atAltitude, age: age, scoreMatrix: self.scoreMatrix };
        var calcEventScore = matrixHelper.calculateEventScore;

        result.RunPoints = calcEventScore('3MILERUN', runScore, true, filterProps);
        result.RowPoints = calcEventScore('ROW', rowScore, true, filterProps);
        result.PushupPoints = calcEventScore('PUSHUP', pushUps, false, filterProps);
        result.CrunchPoints = calcEventScore('CRUNCH', crunches, false, filterProps);
        result.PullupPoints = calcEventScore('PULLUP', pullUps, false, filterProps);
        result.TotalPoints = result.PullupPoints + result.PushupPoints + result.RunPoints + result.RowPoints + result.CrunchPoints;

        result.PushPullCalculatedPoints = result.PullupPoints + result.PushupPoints;
        result.RunRowCalculatedPoints = result.RunPoints + result.RowPoints;

        if (result.RowPoints + result.RunPoints === 0 || result.CrunchPoints === 0 || result.PushupPoints + result.PullupPoints === 0){
          result.Class = 'Failed';
        }
        else {
          result.Class = result.TotalPoints >= 235 ? '1st Class' : result.TotalPoints >= 200 ? 'Second Class' : result.TotalPoints >= 150 ? 'Third Class' : 'Failed';
        }
        return result;
      };

      return{
        getScoreMatrix : self.getScoreMatrix,
        calculateScore : self.calculateScore
      };
  });
