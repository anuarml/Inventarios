"use strict";

angular.module('InvApp.Auth')
	
	.factory('User', function(){
		
		function User (username, name) {
			this.username = username;
			this.name = name;
		}

		return User;
	});