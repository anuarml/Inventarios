'use strict';

angular.module('InvApp.Auth', ['ngRoute', 'angular-jwt'])

    .constant('AUTH', {
        'ROUTES':{
            'LOGIN':'/auth/login',
            //'HOME':'/inv/list',

            'SERVICE_LOGIN': 'http://localhost/inventarios/api/auth/login',
            'SERVICE_LOGOUT': 'http://localhost/inventarios/api/auth/logout'
        },
        'HEADER': 'Authorization',
        'TOKEN_NAME': 'auth_token',
        'USER_PARAM_NAME': 'Usuario',
        'PASS_PARAM_NAME': 'ThoWpassword'
    })

    .config(['$routeProvider', '$httpProvider', 'jwtInterceptorProvider', 'AUTH', 'AuthProvider','AuthInterceptorProvider',
        function($routeProvider, $httpProvider, jwtInterceptorProvider, AUTH, AuthProvider,AuthInterceptorProvider) {

        $routeProvider
            .when(AUTH.ROUTES.LOGIN, {
                templateUrl:'auth/partials/auth-login.html',
                controller:'AuthController'
            });

        jwtInterceptorProvider.tokenGetter = ['config', function(config) {
            if (config.url.substr(config.url.length - 5) == '.html') {
                return null;
            }
            //var token = sessionStorage.getItem(AUTH.TOKEN_NAME);
            var token = AuthProvider.getToken();
            return token;
        }];

        AuthProvider.addPublicRoute(AUTH.ROUTES.LOGIN);
        
        $httpProvider.interceptors.push('jwtInterceptor');
    }])

    .run(['$rootScope', '$location','APP', 'AUTH', 'Auth', function ($rootScope, $location, APP, AUTH, Auth) {

        $rootScope.$on('$routeChangeStart', function (event) {
            console.log('route change');
            if ( !Auth.isPublicRoute($location.path()) && !Auth.isLogged() ) {
                event.preventDefault();
                $location.path(AUTH.ROUTES.LOGIN);
            }

            if( Auth.isLoginRoute($location.path()) && Auth.isLogged() ) {
                event.preventDefault();
                $location.path(APP.ROUTES.HOME);
            }

            $rootScope.isLogged = Auth.isLogged();
        });
    }])

    .controller('AuthController', ['$scope', '$location', 'Auth', 'APP', 'NotificationModal',
        function($scope, $location, Auth, APP, NotificationModal){

        var notificationOptions = NotificationModal.create();
        var notification = notificationOptions.notification;

        $scope.newAuth={};

        $scope.authenticate = function(auth){
            Auth.authenticate(auth).then(function(){
                $scope.newAuth={};
                $location.path(APP.ROUTES.HOME);
            },function(error){
                notification.title = 'No se pudo iniciar sesión';
                notification.error = true;
                notification.setMessage(error);
                notificationOptions.open();
            });
        }
    }]);