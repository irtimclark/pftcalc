'use strict';

/**
 * @ngdoc service
 * @name pftcalcApp.pftCalculatorService
 * @description
 * # pftCalculatorService
 * Service in the pftcalcApp.
 */
angular.module('pftcalcApp')
  .service('pftCalculatorService', function ($http, $q) {
      this.scoreMatrix = null;
      var self = this;
      self.getScoreMatrix = function(){
        var deferred = $q.defer();
        if (self.scoreMatrix !== null) {
          deferred.resolve(self.scoreMatrix);
        }
        else{
          $http.get("data/matrix.json").then(function(response){
            self.scoreMatrix = response.data;
            deferred.resolve(self.scoreMatrix);
          },function(response){
            console.log("Error. Cannot load PFT score matrix!" + response);
            deferred.reject("Error. Cannot load PFT score matrix!");
          });
        }
        return deferred.promise;
      };

      self.findScoreInMatrix = function (val, arr, lowScoreIsBetter) {
        //arr (should) be an array that has scores already ordered
        if (val === null || val === "" || isNaN(val)) {
          return 0;
        }

        //if our score is beyond the bounds of the array, then give a 0
        if ((!lowScoreIsBetter && arr[0].Score > val) || (lowScoreIsBetter && val > arr[arr.length - 1].Score)) {
          return 0;
        }

        var lastScore = arr[arr.length - 1];
        for (var i = arr.length - 1; i >= 0; i--) {
          if (val > arr[i].Score) {
            return lastScore.Points;
          }
          lastScore = arr[i];
        }

        return arr[0].Points;
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
        var ageGenderFilter = function(theEvent){
          var altitudeProperty = self.scoreMatrix[theEvent][gender].hasOwnProperty("HighAlt") && atAltitude ? "HighAlt" : "LowAlt";
          var filteredMatrix = self.scoreMatrix[theEvent][gender][altitudeProperty].filter(function(entry){
            return entry.MinAge <= age && entry.MaxAge >= age;
          });
          return filteredMatrix;
        };

        result.RunPoints = self.findScoreInMatrix(runScore, ageGenderFilter("3MILERUN"),true);
        result.RowPoints = self.findScoreInMatrix(rowScore, ageGenderFilter("ROW"),true);
        result.PushupPoints = self.findScoreInMatrix(pushUps, ageGenderFilter("PUSHUP"),false);
        result.CrunchPoints = self.findScoreInMatrix(crunches, ageGenderFilter("CRUNCH"),false);
        result.PullupPoints = self.findScoreInMatrix(pullUps, ageGenderFilter("PULLUP"),false);
        result.TotalPoints = result.PullupPoints + result.PushupPoints + result.RunPoints + result.RowPoints + result.CrunchPoints;

        result.PushPullCalculatedPoints = result.PullupPoints + result.PushupPoints;
        result.RunRowCalculatedPoints = result.RunPoints + result.RowPoints;

        if (result.RowPoints + result.RunPoints === 0 || result.CrunchPoints === 0 || result.PushupPoints + result.PullupPoints === 0){
          result.Class = "Failed";
        }
        else {
          result.Class = result.TotalPoints >= 235 ? "1st Class" : result.TotalPoints >= 200 ? "Second Class" : result.TotalPoints >= 120 ? "Third Class" : "Fail";
        }
        return result;
      };

      return{
        getScoreMatrix : self.getScoreMatrix,
        calculateScore : self.calculateScore
      };
  });
