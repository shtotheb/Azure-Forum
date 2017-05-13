angular.module('azureChat', ['ngAnimate', 'app.routes', 'authService', 'mainCtrl', 'roomCtrl', 'roomService'])

.config(function($httpProvider) {
	$httpProvider.interceptors.push('AuthInterceptor');
});
