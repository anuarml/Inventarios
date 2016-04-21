"use strict";

angular.module('InvApp.inv')
	
	.factory('Inv', ['$http', '$q', '$filter', 'BsTableHelper', 'INV', 'APP_SERVICE', function($http, $q, $filter, BsTableHelper, INV, APP_SERVICE){
		
		var inv, bsTableControl;

		function _fetch(deferred, filters){
            var config = {headers: {'Content-Type': 'application/json'}};

            $http.post(APP_SERVICE.SERVER+INV.ROUTES.SERVICE_ART_AVAILABILITY, {search: filters}, config)

                .then(function(response){
                    inv = response.data.artDisponible;
					deferred.resolve(inv);
                }, function(error){
                    console.error(error.status, error.statusText);
                    deferred.reject(error);
                });

            return deferred;
		}

		function createBsTableControl(){
			var bsTableControl = BsTableHelper.createBsTableControl();
			var options = bsTableControl.options;
			var column;

			options.filterControl = true;

			column = BsTableHelper.createBsTableColumns();
			column.field = 'Articulo';
			column.title = 'Artículo';
			options.columns.push(column);

			column = BsTableHelper.createBsTableColumns();
			column.field = 'Disponible';
			column.title = 'Disponible';
			options.columns.push(column);

			column = BsTableHelper.createBsTableColumns();
			column.field = 'Descripcion';
			column.title = 'Descripción';
			options.columns.push(column);

			column = BsTableHelper.createBsTableColumns();
			column.field = 'Categoria';
			column.title = 'Categoría';
			options.columns.push(column);

			column = BsTableHelper.createBsTableColumns();
			column.field = 'Grupo';
			column.title = 'Grupo';
			column.filterControl = 'input';
			options.columns.push(column);

			column = BsTableHelper.createBsTableColumns();
			column.field = 'Familia';
			column.title = 'Familia';
			column.filterControl = 'input';
			options.columns.push(column);

			column = BsTableHelper.createBsTableColumns();
			column.field = 'Linea';
			column.title = 'Línea';
			column.filterControl = 'input';
			options.columns.push(column);

			column = BsTableHelper.createBsTableColumns();
			column.field = 'Fabricante';
			column.title = 'Fabricante';
			column.filterControl = 'input';
			options.columns.push(column);

			return bsTableControl;
		}

		function getBsTableControl(){
			//if(!bsTableControl){
				bsTableControl = createBsTableControl();
			//}

			return bsTableControl;
		}


		function all(filters){
			var deferred = $q.defer();

			if(angular.isUndefined(inv)){
				_fetch(deferred, filters);
			}
			else{
				deferred.resolve(inv);
			}

			return deferred.promise;
		}

		function search(filters){
			var deferred = $q.defer();

			_fetch(deferred, filters);

			return deferred.promise;
		}

		return {
			all:all,
			search:search,
			getBsTableControl: getBsTableControl
		};
	}]);