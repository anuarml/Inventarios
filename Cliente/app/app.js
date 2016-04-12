'use strict';

// Declare app level module which depends on views, and components
angular.module('InvApp', [
  'ngRoute',
  'ui.bootstrap',
  'InvApp.Auth',
  'InvApp.item',
  'InvApp.inv'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/auth/login'});
}]);
