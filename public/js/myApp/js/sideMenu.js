angular.module('MyApp')
		.controller('sideMenuController',['$scope','dataLoad',function($scope,dataLoad){
			dataLoad.getAllData(function(data){
					$scope.data=data;
					console.log(data);
			});

		}]);