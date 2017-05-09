angular.module('app.routes', ['ngRoute'])

.config(function($routeProvider, $locationProvider, $compileProvider) {

	$routeProvider

		.when('/', {
			templateUrl: 'app/views/pages/home.html'
		})

		.when('/rooms', {
			templateUrl: 'app/views/pages/roomSearch.html'
		})

	$locationProvider.html5Mode(true);
});
