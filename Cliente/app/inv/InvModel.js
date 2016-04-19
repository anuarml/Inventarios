"use strict";

angular.module('InvApp.inv')
	
	.factory('Inv', ['$http','$q','$filter', function($http,$q,$filter){
		
		var inv;

		function _fetch(deferred){

			console.log('fetching data..');

			$http.get('/inv/data/inv-list.json')
				.then(function(response){
					inv = response.data;
					deferred.resolve(inv);
					console.log('data fetched');
				}, function(response){
					deferred.reject(response.status,response.statusText);
				});

			return deferred;
		}

		function all(){
			var deferred = $q.defer();

			if(angular.isUndefined(inv)){
				_fetch(deferred);
			}
			else{
				deferred.resolve(inv);
			}

			return deferred.promise;
		}

		function searchInv(filters){
			var deferred = $q.defer();
			//console.log(filters);
			$http.get('/api/inv/disponible',{params:{Codigo:filters.Codigo,Descripcion:filters.Descripcion,Fabricante:filters.Fabricante,Empresa:filters.Empresa}})
				.then(function(response){
					inv = response.data;
					deferred.resolve(inv);
				}, function(response){
					deferred.reject(response.status,response.statusText)
				});

			return deferred.promise;
		}


		/*function create(newItem){
			items.push(newItem);
			//save in db. If an error ocur, delete the item from items array.
		}

		function update(newItem){
			var single_object = $filter('filter')(items, function (d) {return newItem && d.code === newItem.code;})[0];

	    	// If you want to see the result, just check the log
	    	angular.copy(newItem, single_object);
			//items.push(item);
			//save in db. If an error ocur, delete the item from items array.
		}

		function get(code){
			var single_object = $filter('filter')(items, function (d) {return d.code === code;})[0];

	    	// If you want to see the result, just check the log
	    	return single_object;
			//items.push(item);
			//save in db. If an error ocur, delete the item from items array.
		}*/

		return {
			all:all,
			searchInv:searchInv
		};
	}]);