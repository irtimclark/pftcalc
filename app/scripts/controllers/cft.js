'use strict';

/**
 * @ngdoc function
 * @name pftcalcApp.controller:CftCtrl
 * @description
 * # CftCtrl
 * Controller of the pftcalcApp
 */
angular.module('pftcalcApp')
  .controller('CftCtrl', function (cftCalculatorService, $scope, matrixHelper) {
    var vm = this;
    vm.input = {};
    vm.input.acl = null;
    vm.input.mtc = null;
    vm.input.muf = null;
    vm.input.gender = 'M';
    vm.input.altitude = false;
    vm.input.age = 17;
    vm.cftCalculationResult = {};

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
      if (vm.input.acl && vm.input.mtc && vm.input.muf) {
        return cftCalculatorService.calculateScore(vm.input.gender,
          vm.input.age,
          vm.input.altitude,
          vm.input.acl,
          matrixHelper.convertTimeToSeconds(vm.input.mtc),
          matrixHelper.convertTimeToSeconds(vm.input.muf));
      }
      return null;
    }

    $scope.$watchCollection('vm.input', function () {
      vm.cftCalculationResult = doCalculation();
    });
  });
