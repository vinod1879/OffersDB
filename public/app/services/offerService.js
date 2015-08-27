angular.module('offerService', []).factory('Offer', function($http) {

	var userFactory = {};

	userFactory.get = function(id) {

		return $http.get('/api/offers/' + id);
	};

	userFactory.all = function() {

		return $http.get('/api/offers');
	};

	userFactory.create = function(offerData) {

		return $http.post('/api/offers/', offerData);
	};

	userFactory.update = function(id, offerData) {

		return $http.put('/api/offers/' + id, offerData);
	};

	userFactory.delete = function(id) {

		return $http.delete('/api/offers/' + id);
	};

	return userFactory;
});