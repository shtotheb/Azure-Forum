angular.module('app.routes', ['ngRoute'])

.config(function($routeProvider, $locationProvider, $compileProvider) {

	$routeProvider

		.when('/', {
			templateUrl: 'app/views/pages/roomSearch.html',
			controller: 'roomController',
			controllerAs: 'room'
		})

		.when('/login', {
			templateUrl: 'app/views/pages/login.html',
			controller: 'mainController',
			controllerAs: 'login'
		})

		.when('/signup', {
			templateUrl: 'app/views/pages/signup.html',
			controller: 'mainController',
			controllerAs: 'signup'
		})

		.when('/rooms/:room_id', {
			templateUrl: 'app/views/pages/roomSingle.html',
			controller: 'roomSingleController',
			controllerAs: 'room'
		})

		.when('/roomcreate', {
			templateUrl: 'app/views/pages/roomCreate.html',
      controller: 'roomCreateController',
      controllerAs: 'room'
		})

	$locationProvider.html5Mode(true);
});
