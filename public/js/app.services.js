angular.module('MyApp').factory('dataLoad', ['$http',function($http){
	var factory = {};

	factory.getAllData=function(success){
		 $http.get('/js/data.json').success( function(data) {
		        success(data);
      });

      	}


	return factory;
}]);