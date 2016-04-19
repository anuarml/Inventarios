"use strict";

angular.module('InvApp.Auth')
    
    .factory('Auth', ['$http','$q','jwtHelper','AUTH','User', function($http,$q,jwtHelper,AUTH,User){
        
        var token;
        var user;
        var publicRoutes = [];
        var storage = window.sessionStorage;

        function authenticate(auth) {
            var deferred = $q.defer(),
                content = createContent(auth),
                config = {
                    headers: {
                        'Content-Type':'application/x-www-form-urlencoded'
                    }
                };

            $http.post(AUTH.ROUTES.SERVICE_LOGIN, content, config)
                .then(function(response){
                    login(response.data.token);
                    deferred.resolve();
                }, function(response){
                    console.error(response.status, response.statusText);
                    deferred.reject();
                });

            return deferred.promise;
        }

        function login(aToken) {
            setToken(aToken);
            setUser(userFromToken(aToken));
        }

        function logout() {
            setToken(null);
            setUser(null);
        }

        function isLogged() {
            return getUser()? true: false;
        }

        function setUser(aUser) {
            user = aUser;
        }

        function getUser(){
            if(!getToken()) return null;

            if(!user){
                user = userFromToken(getToken());
            }

            return user;
        }

        function userFromToken(aToken) {
            var user, payload;

            if(!aToken) return null;

            payload = decodeToken(aToken);

            if(!payload) return null;

            user = new User(payload.sub, payload.name);

            return user;
        }

        function decodeToken(aToken){
            return jwtHelper.decodeToken(aToken);
        }

        function isTokenExpired(aToken){
            return jwtHelper.isTokenExpired(aToken);
        }

        function getTokenExpirationDate(aToken){
            return jwtHelper.getTokenExpirationDate(aToken);
        }

        function getToken() {

            if(!token) {
                token = storage.getItem(AUTH.TOKEN_NAME);
            }

            if(token && isTokenExpired(token)){
                logout();
                return null;
            }

            return token;
        }

        function setToken(aToken) {
            token = aToken;

            if(aToken){
                storage.setItem(AUTH.TOKEN_NAME,aToken);
            } else {
                storage.removeItem(AUTH.TOKEN_NAME);
            }
        }

        function createContent(auth){
            return AUTH.USER_PARAM_NAME+'='+encodeURIComponent(auth.user)+'&'+
                   AUTH.PASS_PARAM_NAME+'='+encodeURIComponent(auth.password);
        }

        function isPublicRoute(aRoute){

            if(!publicRoutes || !aRoute) return false;

            var len = publicRoutes.length;
            
            for(var i=0; i<len; i++){
                if(aRoute.indexOf(publicRoutes[i]) > -1) {
                    return true;
                }
            }

            return false;
        }

        function isLoginRoute(aRoute){
            if(aRoute.indexOf(AUTH.ROUTES.LOGIN) > -1) {
                return true;
            }
            return false;
        }

        function addPublicRoute(aRoute){
            if(!isPublicRoute(aRoute))
                publicRoutes.push(aRoute);
        }

        return {
            logout: logout,
            getUser: getUser,
            authenticate: authenticate,
            addPublicRoute: addPublicRoute,

            isLogged: isLogged,
            isPublicRoute: isPublicRoute,
            isLoginRoute: isLoginRoute
        };
    }]);