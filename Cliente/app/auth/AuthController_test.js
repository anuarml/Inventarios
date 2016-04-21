'use strict';

describe('Module: InvApp.Auth.', function() {
  
  //beforeEach(module('InvApp.auth'));

  //var $controller, $httpBackend, $rootScope, $location;

  /*beforeEach(inject(function(_$httpBackend_, _$rootScope_,_$controller_, _$location_){

  	$controller = _$controller_;
  	$httpBackend = _$httpBackend_;
  	$rootScope = _$rootScope_;
    $location = _$location_;
  }));*/

  describe('AuthController', function(){

  	var AuthController, $httpBackend, $rootScope, $location, $scope, $controller, APP, AUTH;

    beforeEach(module('InvApp'));

    beforeEach(inject(function($injector) {
      $httpBackend=$injector.get('$httpBackend');
      $rootScope=$injector.get('$rootScope');
      $controller=$injector.get('$controller');
      $location=$injector.get('$location');
      APP = $injector.get('APP');
      AUTH = $injector.get('AUTH');

      AuthController=function() {
        return $controller('AuthController', { 
          '$scope': $rootScope,
          '$location': $location
        });
      };
    }));

    it('should have an AuthController controller', function() {
      expect('InvApp.AuthController').toBeDefined();
    });

    it('should logs an user in and redirect', function() {
      AuthController();
      
      $httpBackend.expectPOST(APP.SERVICE.SERVER+AUTH.ROUTES.SERVICE_LOGIN).respond([200,{data:{token:'asdfasdfa'}}]);

      //$rootScope.user = 'testUser';
      //$rootScope.password = 'password';
      var auth = {};
      auth.user = 'testUser';
      auth.password = 'password';
      $rootScope.authenticate(auth);
      
      $httpBackend.flush();
      //$rootScope.$digest();
      expect($location.path()).toBe(APP.ROUTES.HOME); // --> error: location is not defined
      //expect($cookieStore.get('username')).toBe('testUser');
    });
  	/*beforeEach(function(){
  		$scope = $rootScope.$new();
  		AuthController = $controller('AuthController', { $scope: $scope });

  		$httpBackend.expectGET('/item/data/item-list.json').
  				respond([{
							code:"001",description:"Mouse Razer R2500",price:1999.99,inventory:3
						},
						{
							code:"002",description:"Mouse Microsoft M500",price:149,inventory:100000000
						}]);
  	});

    it('authenticate the user by redirecting him to the main page', function(){

    	expect($scope.items).toBeUndefined();
    	$httpBackend.flush();
    	expect($scope.items).toEqual([{
							code:"001",description:"Mouse Razer R2500",price:1999.99,inventory:3
						},
						{
							code:"002",description:"Mouse Microsoft M500",price:149,inventory:100000000
						}]);
    });*/
 
  });

});