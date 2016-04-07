'use strict';

angular.module('InvApp.Auth', ['ngRoute'])

	.constant('AUTH_ROUTES',{
		'LOGIN':'/auth/login',
		'LOGOUT':'/auth/logout',
		'SUCCESS':'/'
	})

	.config(['$routeProvider','AUTH_ROUTES',function($routeProvider,AUTH_ROUTES) {
		$routeProvider
			.when(AUTH_ROUTES.LOGIN, {
				templateUrl:'auth/partials/auth-login.html',
				controller:'AuthController'
			})
			.when(AUTH_ROUTES.SUCCESS, {
				templateUrl:'inv/partials/inv-search.html',
				controller:'AuthController'
			})
			.when(AUTH_ROUTES.LOGOUT, {
				controller:'AuthController'
			});
	}])

	.controller('AuthController', ['$scope','$location',/*'Auth',*/'AUTH_ROUTES',
		function($scope,$location,/*Auth,*/AUTH_ROUTES){

		/*$scope.authenticate = function(auth){
			Auth.authenticate(auth);
			$location.path(AUTH_ROUTES.SUCCESS)
		}*/

		$scope.lang = 'es';
	}]);