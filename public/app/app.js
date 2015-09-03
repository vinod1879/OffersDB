angular.module('userApp', ['ngAnimate', 'app.routes', 'authService', 'mainCtrl', 'userCtrl', 'offerCtrl', 'userService', 'bannerCtrl', 'bannerService']).config(function($httpProvider) {

	$httpProvider.interceptors.push('AuthInterceptor');
});

// angular.module('userApp', ['ngAnimate', 'approuter', 'authService', 'mainCtrl', 'userCtrl', 'offerCtrl', 'userService']);