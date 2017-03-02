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
    'ui.router',
    'ui.mask'
  ]).config(['uiMask.ConfigProvider', function (uiMaskConfigProvider) {
  uiMaskConfigProvider.maskDefinitions({'5': /[0-5]/});
}]).config(function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/pft');

  $stateProvider
    .state('pft', {
      url: '/pft',
      templateUrl: 'views/main.html',
      controller: 'MainCtrl as vm',
      resolve: {
        matrixDownloaded: function (pftCalculatorService) {
          return pftCalculatorService.getScoreMatrix();
        }
      }
    })
    .state('cft', {
      url: '/cft',
      templateUrl: 'views/cft.html',
      controller: 'CftCtrl as vm',
      resolve: {
        matrixDownloaded: function (cftCalculatorService) {
          return cftCalculatorService.getScoreMatrix();
        }
      }
    });
})
  .constant('matrixHelper', window.matrixHelper)
  .constant('_', window._)
  ;
