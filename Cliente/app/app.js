'use strict';

// Declare app level module which depends on views, and components
angular.module('InvApp', [
  'ngRoute',
  'InvApp.Auth',
//  'InvApp.item',
  'InvApp.inv',
  'InvApp.User',
  'InvApp.BsTable',
  'jcs-autoValidate'
])
.constant('APP', {
	'ROUTES':{
		'HOME':'/inv/list'
	},
	'SERVICE':{
		'SERVER': 'http://192.168.96.80/inventarios/api'
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
}])
.run([
	'bootstrap3ElementModifier',
	function (bootstrap3ElementModifier) {
	      bootstrap3ElementModifier.enableValidationStateIcons(true);
}])
.run([
    'defaultErrorMessageResolver',
    function (defaultErrorMessageResolver) {
        // To change the root resource file path
        //defaultErrorMessageResolver.setI18nFileRootPath('bower_components/angular-auto-validate/dist/lang');
        //defaultErrorMessageResolver.setCulture('es-Co');
    }
]);