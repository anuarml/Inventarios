'use strict';

angular.module('InvApp.inv', ['ngRoute', 'bsTable'])

.constant('INV', {
	ROUTES: {
		'LIST': '/inv/list',

		'SERVICE_ART_AVAILABILITY': 'http://localhost/inventarios/api/inv/disponible'
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

.controller('InvController', ['$scope', 'NotificationModal', 'Inv', 'Auth',
	function($scope, NotificationModal, Inv, Auth) {

	var notificationOptions = NotificationModal.create();
    var notification = notificationOptions.notification;

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
	}, function(error){
		notification.title = 'No se pudieron obtener las empresas del usuario';
        notification.error = true;
        notification.setMessage(error);
        notificationOptions.open();
	})

	// Establece las propiedades de la tabla
	$scope.bsTableControl = Inv.getBsTableControl();

	// Realiza la consulta del disponible en inventario
	$scope.searchInv = function(filters){
		Inv.search(filters).then(function(inv){
			$scope.bsTableControl.setData(inv);
		}, function(error){
			notification.title = 'No se pudo completar la búsqueda';
            notification.error = true;
            notification.setMessage(error);
            notificationOptions.open();
		});
	};

}]);
