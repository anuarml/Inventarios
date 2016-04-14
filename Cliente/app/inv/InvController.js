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

	.controller('InvController', ['$scope','$http','$location','Inv','INV_ROUTES','$compile',
		function($scope,$http,$location,Inv,INV_ROUTES,$compile){

		//var code = $routeParams.code;

		Inv.all().then(function(inv){
			$scope.dataBases=['Alumayab','Argentum','Herramax','La Viga','Alumik','Valsi','Mayalum','Alpina']
			$scope.columns=[{name:'Articulo',filter:false},{name:'Almacen',filter:false},{name:'Disponible',filter:false},{name:'Rama',filter:false},{name:'Descripcion',filter:false},{name:'Grupo',filter:true},{name:'Categoria',filter:false},{name:'Familia',filter:true},{name:'Linea',filter:true},{name:'Fabricante',filter:true}];
			$scope.filters=[{Codigo:'',Descripcion:'',Fabricante:'',Empresa:''}]
			$scope.inv = inv;
			$scope.invSafe = angular.copy(inv);
			$scope.itemsByPage=25;	
			$scope.displayedPages=5;
			//if(angular.isDefined(code)){
			//$scope.newInv = angular.copy(Inv.get(code));
			//$scope.isEdit = true;
			//}
			$('#invTable').bootstrapTable({
				data: $scope.inv
			});
			//$scope.inv[0].Articulo = 'Hola';
			//$('#invTable').bootstrapTable('refresh');

		}, function(msg){
			console.error(msg);
		});


		$scope.search = function(filters){
			Inv.search(filters.Codigo,filters.Descripcion,filters.Fabricante,filters.Empresa);
			//$location.path(ITEM_ROUTES.LIST);
		}

		$scope.loadData = function() {
			$scope.inv = $scope.inv.slice(1,2);
		}

		$scope.lang = 'es';
	}])

	.directive('relinkEvent', function($rootScope) {
	    return {
	        transclude: 'element',
	        restrict: 'A',
	        link: function(scope, element, attr, ctrl, transclude) {
	            var previousContent = null;
	            var triggerRelink = function() {
	                if (previousContent) {
	                    previousContent.remove();
	                    previousContent = null;
	                }
	                transclude(function (clone) {
	                    element.parent().append(clone);
	                    previousContent = clone;
	                });
	            };
	            triggerRelink();                
	            $rootScope.$on(attr.relinkEvent, triggerRelink);
	        }
	    };
	});