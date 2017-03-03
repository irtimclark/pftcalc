'use strict';

/**
 * @ngdoc directive
 * @name pftcalcApp.directive:jqmask
 * @description
 * # jqmask
 */
angular.module('pftcalcApp')
  .directive('jqmask', function () {
    return {
      restrict: 'A',
      link: function postLink(scope, element) {
        $(element).mask("00:00", {clearIfNotMatch: true, placeholder:'MM:SS'});
      }
    };
  });
