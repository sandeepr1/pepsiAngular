angular.module('MyApp', ['ngRoute','ngMaterial', 'ngMessages'])

		.controller('mainController',['$scope','dataLoad',function($scope,dataLoad){
			dataLoad.getAllData(function(data){
					$scope.data=data;
					console.log(data);
			});

		}]);


		
