angular.module('app.routes', ['ngRoute']).config(function($routeProvider, $locationProvider) {

	$routeProvider.when('/', {

		templateUrl		: 'app/views/pages/home.html'
	}).when('/login', {

		templateUrl		: 'app/views/pages/login.html',
		controller 		: 'mainController',
		controllerAs	: 'login'
	}).when('/users', {

		templateUrl 	: 'app/views/pages/users/all.html',
		controller 		: 'userController',
		controllerAs 	: 'user'
	}).when('/users/create', {

		templateUrl		: 'app/views/pages/users/single.html',
		controller 		: 'userCreateController',
		controllerAs	: 'user'
	}).when('/users/:user_id', {

		templateUrl		: 'app/views/pages/users/single.html',
		controller 		: 'userEditController',
		controllerAs 	: 'user'
	}).when('/offers', {

		templateUrl 	: 'app/views/pages/offers/all.html',
		controller  	: 'offerController',
		controllerAs 	: 'offer'
	}).when('/offers/create', {

		templateUrl 	: 'app/views/pages/offers/single.html',
		controller 		: 'offerCreateController',
		controllerAs 	: 'offer'
	}).when('/offers/:offer_id', {

		templateUrl 	: 'app/views/pages/offers/single.html',
		controller 		: 'offerEditController',
		controllerAs 	: 'offer'
	});

	$locationProvider.html5Mode(true);
});