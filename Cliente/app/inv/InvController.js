'use strict';

angular.module('InvApp.inv', ['ngRoute', 'bsTable'])

.constant('INV', {
	ROUTES: {
		'LIST': '/inv/list',

		'SERVICE_ART_AVAILABILITY': '/inv/disponible'
	},
	PARAM_NAMES: {
		CODE: 'articulo',
		DESCRIPTION: 'descripcion',
		PRODUCER: 'fabricante',
		COMPANY: 'empresa'
	}
})

.config(['$routeProvider', 'INV', function($routeProvider, INV) {
	$routeProvider
		.when(INV.ROUTES.LIST, {
			templateUrl: 'inv/partials/inv-list.html',
			controller: 'InvController'
		});
}])

.controller('InvController', ['$scope', 'Inv', 'Auth',
	function($scope, Inv, Auth) {

	// Valor inicial de los filtros de busqueda
	$scope.filters={articulo:'',descripcion:'',fabricante:'',empresa:''};

	// Obtiene el usuario atenticado
	var user = Auth.getUser();

	// Obtiene la lista de empresas en las que puede consultar el usuario
	user && user.getCompanies().then(function(companies){
		$scope.companies = companies;
		if(companies.length>0 && companies[0] && companies[0].Empresa){
			$scope.filters.empresa = companies[0].Empresa;
		}
	})

	// Establece las propiedades de la tabla
	$scope.bsTableControl = Inv.getBsTableControl();

	// Realiza la consulta del disponible en inventario
	$scope.searchInv = function(filters){
		Inv.search(filters).then(function(inv){
			$scope.bsTableControl.setData(inv);
		});
	};

}]);
