'use strict';

/**
 * @ngdoc function
 * @name pftcalcApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the pftcalcApp
 */
angular.module('pftcalcApp')
  .controller('MainCtrl', function (pftCalculatorService, $scope, matrixHelper) {
    var vm = this;
    vm.input = {};
    vm.input.runTime = null;
    vm.input.crunches = null;
    vm.input.pullups = null;
    vm.input.rowTime = null;
    vm.input.gender = 'M';
    vm.input.altitude = false;
    vm.input.age = 17;
    vm.pftCalculationResult = {};

    vm.getCssClassForScore = function (score) {
      if (score === 0) {
        return 'progress-bar-danger';
      }
      if (score >= 78) {
        return 'progress-bar-success';
      }
      if (score >= 66) {
        return 'progress-bar-info';
      }
      return 'progress-bar-warning';
    };

    $scope.$watch('vm.input.age', function (newValue) {
      if (newValue < 46) {
        vm.input.rowTime = '';
      }
    });

    function doCalculation() {
      if ((vm.input.rowTime || vm.input.runTime) && vm.input.crunches && (vm.input.pullups || vm.input.pushups) && !(vm.input.rowTime && vm.input.runTime) && !(vm.input.pushups && vm.input.pullups)) {
        return pftCalculatorService.calculateScore(vm.input.gender,
          vm.input.age,
          vm.input.altitude,
          matrixHelper.convertTimeToSeconds(vm.input.rowTime),
          matrixHelper.convertTimeToSeconds(vm.input.runTime),
          vm.input.pullups === '' ? null : vm.input.pullups,
          vm.input.pushups === '' ? null : vm.input.pushups,
          vm.input.crunches);
      }
      return null;
    }

    $scope.$watchCollection('vm.input', function () {
      vm.pftCalculationResult = doCalculation();
    });
  });
