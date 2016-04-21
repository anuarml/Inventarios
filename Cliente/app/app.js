'use strict';

// Declare app level module which depends on views, and components
angular.module('InvApp', [
  'ngRoute',
  'InvApp.Auth',
//  'InvApp.item',
  'InvApp.inv',
  'InvApp.User',
  'InvApp.BsTable'
])
.constant('APP', {
	'ROUTES':{
		'HOME':'/inv/list'
	}
})
.config(['$routeProvider','APP', function($routeProvider, APP) {
  $routeProvider.otherwise({redirectTo: APP.ROUTES.HOME});
}])
.controller('InvAppController',['$scope', '$location', 'Auth', 'AUTH',function($scope, $location, Auth, AUTH){
	$scope.logout = function(){
		Auth.logout().then(function(){
			$location.path(AUTH.ROUTES.LOGIN);
		});
	};
}]);
