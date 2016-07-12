var app=angular.module('MyApp', ['ngRoute','ngMaterial', 'ngMessages']);

		app.controller('mainController',['$scope','dataLoad',function($scope,dataLoad){
			dataLoad.getAllData(function(data){
					$scope.data=data;
					console.log(data);
			});

		}]);


		