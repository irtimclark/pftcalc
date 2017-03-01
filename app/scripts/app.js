'use strict';

/**
 * @ngdoc overview
 * @name pftcalcApp
 * @description
 * # pftcalcApp
 *
 * Main module of the application.
 */
angular
  .module('pftcalcApp', [
    'ngAnimate',
    'ngSanitize',
    'ngTouch',
    'ui.mask'
  ]).config(['uiMask.ConfigProvider', function(uiMaskConfigProvider) {
      uiMaskConfigProvider.maskDefinitions({'5': /[0-5]/});
}]);
