angular.module('MyApp')
		.controller('dashboardController',['$scope','dataLoad',function($scope,dataLoad){
				dataLoad.getAllData(function(data){
					$scope.data=data;
					console.log(data);
			});

		}]);