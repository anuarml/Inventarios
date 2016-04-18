'use strict';

angular.module('InvApp.inv', ['ngRoute',/*,'smart-table','lrDragNDrop',*/'bsTable'])

	.constant('INV_ROUTES',{
		'LIST':'/inv/list'
	})

	.config(['$routeProvider','INV_ROUTES',function($routeProvider,INV_ROUTES) {
		$routeProvider
			.when(INV_ROUTES.LIST, {
				templateUrl:'inv/partials/index.html',
				controller:'InvController'
			});
	}])

	.controller('InvController', ['$scope','$http','$location','Inv','INV_ROUTES','$compile',
		function($scope,$http,$location,Inv,INV_ROUTES,$compile){

		//var code = $routeParams.code;
		$scope.workspaces = [];
	    $scope.workspaces.push({ name: 'Workspace 1' });

	    $scope.changeCurrentWorkspace = function (wk) {
	        $scope.currentWorkspace = wk;
	    };

		Inv.all().then(function(inv){
			$scope.inv = inv;
			//$scope.refresh();
			/*$scope.$apply(function(){
        		$scope.inv = inv;
            });*/

            $scope.workspaces[0].bsTableControl.options = {
	                data: $scope.inv,
	                rowStyle: function (row, index) {
	                    return { classes: 'none' };
	                },
	                cache: false,
	                height: 600,
	                striped: true,
	                pagination: true,
	                pageSize: 10,
	                pageList: [5, 10, 25, 50, 100, 200],
	                search: true,
	                showColumns: true,
	                showRefresh: true,
	                minimumCountColumns: 2,
	                clickToSelect: false,
	                showToggle: true,
	                maintainSelected: true,
	                columns: [{
	                    field: 'Articulo',
	                    title: 'Articulo',
	                    align: 'right',
	                    valign: 'bottom',
	                    sortable: true
	                }, {
	                    field: 'Disponible',
	                    title: 'Disponible',
	                    align: 'center',
	                    valign: 'bottom',
	                    sortable: true
	                }, {
	                    field: 'Rama',
	                    title: 'Rama',
	                    align: 'center',
	                    valign: 'middle',
	                    sortable: true
	                }, {
	                    field: 'Descripcion',
	                    title: 'Descripcion',
	                    align: 'left',
	                    valign: 'top',
	                    sortable: true
	                }, {
	                    field: 'Grupo',
	                    title: 'Grupo',
	                    align: 'center',
	                    valign: 'middle',
	                    clickToSelect: false,
	                    //formatter: flagFormatter,
	                    // events: flagEvents
	                }]
	            };
            /*if (!$scope.$$phase) $scope.$apply(function(){
	          		var invT = [{
						"Articulo":"001",
						"Almacen":"Centro",
						"Disponible":50,
						"Rama":"arbol",
						"Descripcion":"Mouse Razer R2500",
						"Grupo":"LODEMORED",
						"Categoria":"Computacion",
						"Familia":"Accesorios",
						"Linea":"Blanca",
						"Fabricante":"DELL"
					}]
	          		$scope.inv = invT;
	              });*/

            /*setTimeout(function(){
               $scope.$apply(function(){
	          		var invT = [{
						"Articulo":"001",
						"Almacen":"Centro",
						"Disponible":50,
						"Rama":"arbol",
						"Descripcion":"Mouse Razer R2500",
						"Grupo":"LODEMORED",
						"Categoria":"Computacion",
						"Familia":"Accesorios",
						"Linea":"Blanca",
						"Fabricante":"DELL"
					}]
	          		$scope.inv = invT;
	              });
	        },100);*/
			/*$scope.dataBases=['Alumayab','Argentum','Herramax','La Viga','Alumik','Valsi','Mayalum','Alpina']
			$scope.columns=[{name:'Articulo',filter:false},{name:'Almacen',filter:false},{name:'Disponible',filter:false},{name:'Rama',filter:false},{name:'Descripcion',filter:false},{name:'Grupo',filter:true},{name:'Categoria',filter:false},{name:'Familia',filter:true},{name:'Linea',filter:true},{name:'Fabricante',filter:true}];
			$scope.filters=[{Codigo:'',Descripcion:'',Fabricante:'',Empresa:''}]
			
			$scope.invSafe = angular.copy(inv);
			$scope.itemsByPage=25;	
			$scope.displayedPages=5;
			//if(angular.isDefined(code)){
			//$scope.newInv = angular.copy(Inv.get(code));
			//$scope.isEdit = true;
			//}
			$('#invTable').bootstrapTable({
				data: $scope.inv
			});*/
			//$scope.inv[0].Articulo = 'Hola';
			//$('#invTable').bootstrapTable('refresh');
			//$scope.$apply();
			
		}, function(msg){
			console.error(msg);
		});

		$scope.workspaces.forEach(function (wk,index) {
	        var colData = {workspace: wk.name};
	        //wk.rows = makeRandomRows(colData);
	        
	        wk.bsTableControl = {
	            options: {
	                data: [],
	                rowStyle: function (row, index) {
	                    return { classes: 'none' };
	                },
	                cache: false,
	                height: 600,
	                striped: true,
	                pagination: true,
	                pageSize: 10,
	                pageList: [5, 10, 25, 50, 100, 200],
	                search: true,
	                showColumns: true,
	                showRefresh: true,
	                minimumCountColumns: 2,
	                clickToSelect: false,
	                showToggle: true,
	                maintainSelected: true,
	                columns: [{
	                    field: 'Articulo',
	                    title: 'Articulo',
	                    align: 'right',
	                    valign: 'bottom',
	                    sortable: true
	                }, {
	                    field: 'Disponible',
	                    title: 'Disponible',
	                    align: 'center',
	                    valign: 'bottom',
	                    sortable: true
	                }, {
	                    field: 'Rama',
	                    title: 'Rama',
	                    align: 'center',
	                    valign: 'middle',
	                    sortable: true
	                }, {
	                    field: 'Descripcion',
	                    title: 'Descripcion',
	                    align: 'left',
	                    valign: 'top',
	                    sortable: true
	                }, {
	                    field: 'Grupo',
	                    title: 'Grupo',
	                    align: 'center',
	                    valign: 'middle',
	                    clickToSelect: false,
	                    //formatter: flagFormatter,
	                    // events: flagEvents
	                }]
	            }
	        };
	        /*function flagFormatter(value, row, index) {
	            return '<img src="' + row.flagImage + '"/>'
	        }*/

	    });
		/*$scope.search = function(filters){
			Inv.search(filters.Codigo,filters.Descripcion,filters.Fabricante,filters.Empresa);
			//$location.path(ITEM_ROUTES.LIST);
		}

		$scope.loadData = function() {
			$scope.inv = $scope.inv.slice(1,2);
		}

		$scope.lang = 'es';*/

		


	    //Select the workspace in document ready event
	    $(document).ready(function () {
	        $scope.changeCurrentWorkspace($scope.workspaces[0]);
	        //$scope.$apply();
	    });
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