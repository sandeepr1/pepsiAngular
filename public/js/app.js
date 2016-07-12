var app=angular.module('MyApp', ['ngRoute','ngMaterial', 'ngMessages','ui.grid', 'ui.grid.edit','ui.grid.selection']);

		app.controller('mainController',['$scope','dataLoad',function($scope,dataLoad){
			dataLoad.getAllData(function(data){
					$scope.data=data;
					console.log(data);
			});

		}]);


		