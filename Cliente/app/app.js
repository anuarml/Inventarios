'use strict';

// Declare app level module which depends on views, and components
angular.module('posApp', [
  'ngRoute',
  'ui.bootstrap',
  'ui.grid',
  'posApp.item'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/item/list'});
}]);
