angular.module('bannerService', []).factory('Banner', function($http) {

	var bannerFactory = {};

	bannerFactory.get = function(id) {

		return $http.get('/api/banners/' + id);
	};

	bannerFactory.all = function() {

		return $http.get('/api/banners');
	};

	bannerFactory.create = function(bannerData) {

		return $http.post('/api/banners/', bannerData);
	};

	bannerFactory.update = function(id, bannerData) {

		return $http.put('/api/banners/' + id, bannerData);
	};

	bannerFactory.delete = function(id) {

		return $http.delete('/api/banners/' + id);
	};

	return bannerFactory;
});