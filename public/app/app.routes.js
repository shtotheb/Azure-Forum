angular.module('app.routes', ['ngRoute'])

.config(function($routeProvider, $locationProvider, $compileProvider) {

	$routeProvider

		.when('/', {
			templateUrl: 'app/views/pages/home.html'
		})

		.when('/rooms', {
			templateUrl: 'app/views/pages/roomSearch.html',
      controller: 'roomController',
      controllerAs: 'room'
		})

		.when('/roomCreate', {
			templateUrl: 'app/views/pages/roomCreate.html',
      controller: 'roomCreateController',
      controllerAs: 'room'
		})

	$locationProvider.html5Mode(true);
});
