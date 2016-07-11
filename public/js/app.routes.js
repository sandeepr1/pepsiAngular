angular.module('MyApp').config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
    .when('/', {
      templateUrl : 'js/myApp/views/dashboard.view.html',
      controller : 'dashboardController'
    })
       .otherwise({
      redirectTo : '/',
    });
  }
]);
