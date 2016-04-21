'use strict';

// Declare app level module which depends on views, and components
angular.module('InvApp', [
  'ngRoute',
  'ui.bootstrap',
  'InvApp.BsTable',
  'InvApp.Modal',
  'InvApp.Auth',
//  'InvApp.item',
  'InvApp.inv',
  'InvApp.User'
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
	$scope.logout = function($event){
		$event.preventDefault();
		Auth.logout().then(function(){
			$location.path(AUTH.ROUTES.LOGIN);
		},function(){
			$location.path(AUTH.ROUTES.LOGIN);
		});
	};
}]);
