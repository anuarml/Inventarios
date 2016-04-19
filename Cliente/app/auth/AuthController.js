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

	.controller('AuthController', ['$scope','$location',/*'Auth',*/'AUTH_ROUTES','$rootScope',
		function($scope,$location,/*Auth,*/AUTH_ROUTES,$rootScope){

		$scope.authenticate = function(auth){
			//Auth.authenticate(auth);
			alert('Paso');
			$location.path(AUTH_ROUTES.SUCCESS)
		};

		$rootScope.isLogged = true;
		console.log($rootScope.isLogged);
		//$scope.endSession = function(token){}

		$scope.lang = 'es';
	}]);