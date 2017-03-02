/**
 * Created by tim.clark on 3/2/2017.
 */
'use strict';

(function(window){
  var matrixHelper = window.matrixHelper || (window.matrixHelper = {});
  matrixHelper.calculateEventScore = function(theEvent, score, lowScoreIsBetter, filterProps) {
    var altitudeProperty = filterProps.scoreMatrix[theEvent][filterProps.gender].hasOwnProperty('HighAlt') && filterProps.atAltitude ? 'HighAlt' : 'LowAlt';
    var filteredMatrix = filterProps.scoreMatrix[theEvent][filterProps.gender][altitudeProperty].filter(function(entry){
      return entry.MinAge <= filterProps.age && entry.MaxAge >= filterProps.age;
    });

    return matrixHelper.findScoreInMatrix(score,filteredMatrix,lowScoreIsBetter);
  };

  matrixHelper.findScoreInMatrix = function (val, arr, lowScoreIsBetter) {
    //arr (should) be an array that has scores already ordered
    if (val === null || val === '' || isNaN(val)) {
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

  matrixHelper.convertTimeToSeconds = function (time) {
    if (time === null || time === '' || !/\d{2}:\d{2}(\d{2}:)?/.test(time)) {
      return null;
    }

    var hrs = 0;
    var min = 0;
    var sec = 0;

    var parts = time.split(':');
    if (parts.length === 3) { //HH:MM:SS
      sec = parseInt(parts[2], 10);
      min = parseInt(parts[1], 10);
      hrs = parseInt(parts[0], 10);
    }
    else if (parts.length === 2) { //MM:SS
      sec = parseInt(parts[1], 10);
      min = parseInt(parts[0], 10);
    }
    else if (parts.length === 1) { //SS
      sec = parseInt(parts[0], 10);
    }

    if (isNaN(hrs)) {
      hrs = 0;
    }
    if (isNaN(min)) {
      min = 0;
    }
    if (isNaN(sec)) {
      sec = 0;
    }
    if (min >= 60 || sec >= 60) {
      return null;
    }
    return (hrs * 3600) + (min * 60) + sec;
  };
})(window);


