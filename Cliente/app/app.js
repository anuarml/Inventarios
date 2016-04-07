'use strict';

// Declare app level module which depends on views, and components
angular.module('InvApp', [
  'ngRoute',
  'ui.bootstrap',
  'ui.grid',
  'InvApp.Auth'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/auth/login'});
}]);
