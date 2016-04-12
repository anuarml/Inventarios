'use strict';

angular.module('InvApp.inv', ['ngRoute','smart-table','lrDragNDrop'])

	.constant('INV_ROUTES',{
		'LIST':'/inv/list'
	})

	.config(['$routeProvider','INV_ROUTES',function($routeProvider,INV_ROUTES) {
		$routeProvider
			.when(INV_ROUTES.LIST, {
				templateUrl:'inv/partials/inv-list.html',
				controller:'InvController'
			});
	}])

	.controller('InvController', ['$scope','$http','$location','Inv','INV_ROUTES',
		function($scope,$http,$location,Inv,INV_ROUTES){

		//var code = $routeParams.code;

		Inv.all().then(function(inv){
			$scope.columns=[{name:'Articulo',filter:false},{name:'Almacen',filter:false},{name:'Disponible',filter:false},{name:'Rama',filter:false},{name:'Descripcion',filter:false},{name:'Grupo',filter:true},{name:'Categoria',filter:false},{name:'Familia',filter:true},{name:'Linea',filter:true},{name:'Fabricante',filter:true}];
			$scope.inv = inv;
			$scope.invSafe = angular.copy(inv);
			$scope.itemsByPage=25;
			//if(angular.isDefined(code)){
			//$scope.newInv = angular.copy(Inv.get(code));
			//$scope.isEdit = true;
			//}
		}, function(msg){
			console.error(msg);
		});

		$scope.lang = 'es';
	}]);