'use strict';

/**
 * @ngdoc function
 * @name pftcalcApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the pftcalcApp
 */
angular.module('pftcalcApp')
  .controller('MainCtrl', function (pftCalculatorService, $scope) {
    var vm = this;
    vm.input = {};
    vm.input.runTime = "15:00";
    vm.input.crunches = 90;
    vm.input.pullups = 15;
    vm.input.rowTime = null;
    vm.input.gender = "M";
    vm.input.altitude = false;
    vm.input.age = 17;
    vm.pftCalculationResult = {};

    vm.getCssClassForScore = function (score) {
      if (score === 0) {
        return "progress-bar-danger";
      }
      if (score >= 78) {
        return "progress-bar-success";
      }
      if (score >= 66) {
        return "progress-bar-info";
      }
      return "progress-bar-warning";
    };

    $scope.$watch('vm.input.age', function (newValue) {
      if (newValue < 46) {
        vm.input.rowTime = "";
      }
    });

    function convertTimeToSeconds(time) {
      if (time === null || time === "" || !/\d{2}:\d{2}(\d{2}:)?/.test(time)) {
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
    }

    function doCalculation() {
      if ((vm.input.rowTime || vm.input.runTime) && vm.input.crunches && (vm.input.pullups || vm.input.pushups) && !(vm.input.rowTime && vm.input.runTime) && !(vm.input.pushups && vm.input.pullups)) {
        return pftCalculatorService.calculateScore(vm.input.gender,
          vm.input.age,
          vm.input.altitude,
          convertTimeToSeconds(vm.input.rowTime),
          convertTimeToSeconds(vm.input.runTime),
          vm.input.pullups === "" ? null : vm.input.pullups,
          vm.input.pushups === "" ? null : vm.input.pushups,
          vm.input.crunches);
      }
      return null;
    }

    $scope.$watchCollection('vm.input', function () {
      vm.pftCalculationResult = doCalculation();
    });



  });
