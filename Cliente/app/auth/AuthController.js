'use strict';

angular.module('InvApp.Auth', ['ngRoute','angular-jwt'])

	.constant('AUTH',{
		'ROUTES':{
			'LOGIN':'/auth/login',
			'LOGOUT':'/auth/logout',
			'HOME':'/inv/list',

			'SERVICE_LOGIN': 'http://localhost/inventarios/api/auth/login',
			'SERVICE_LOGOUT': 'http://localhost/inventarios/api/auth/logout'
		},
		'TOKEN_NAME': 'auth_token',
		'USER_PARAM_NAME': 'Usuario',
		'PASS_PARAM_NAME': 'ThoWpassword'
	})

	.config(['$routeProvider','$httpProvider','jwtInterceptorProvider','AUTH',
		function($routeProvider,$httpProvider,jwtInterceptorProvider,AUTH) {

		$routeProvider
			.when(AUTH.ROUTES.LOGIN, {
				templateUrl:'auth/partials/auth-login.html',
				controller:'AuthController'
			})
			.when(AUTH.ROUTES.HOME, {
				templateUrl:'inv/partials/inv-search.html',
				controller:'AuthController'
			})
			.when(AUTH.ROUTES.LOGOUT, {
				controller:'AuthController'
			});

		jwtInterceptorProvider.tokenGetter = function() {
		  return localStorage.getItem(AUTH.TOKEN_NAME);
		};
		
		$httpProvider.interceptors.push('jwtInterceptor');
	}])

	.run(['$rootScope', '$location', 'AUTH', 'Auth', function ($rootScope, $location, AUTH, Auth) {
		Auth.addPublicRoute(AUTH.ROUTES.LOGIN);

	    $rootScope.$on('$routeChangeStart', function (event) {

	        if ( !Auth.isPublicRoute($location.path()) && !Auth.isLogged() ) {
	            event.preventDefault();
	            $location.path(AUTH.ROUTES.LOGIN);
	        }

	        if( Auth.isLoginRoute($location.path()) && Auth.isLogged() ) {
	        	event.preventDefault();
	        	$location.path(AUTH.ROUTES.HOME);
	        }
	    });
	}])

	.controller('AuthController', ['$scope','$location','Auth','AUTH',
		function($scope,$location,Auth,AUTH){

		$scope.newAuth={};

		$scope.authenticate = function(auth){
			Auth.authenticate(auth).then(function(){
				$scope.newAuth={};
				console.log(Auth.getUser());
				$location.path(AUTH.ROUTES.HOME);
			},function(error){
				
			});
		}

		$scope.logout = function(){
			Auth.logout();
		}
	}]);
