angular.module('offerService', []).factory('Offer', function($http) {

	var offerFactory = {};

	offerFactory.get = function(id) {

		return $http.get('/api/offers/' + id);
	};

	offerFactory.all = function() {

		return $http.get('/api/offers');
	};

	offerFactory.create = function(offerData) {

		return $http.post('/api/offers/', offerData);
	};

	offerFactory.update = function(id, offerData) {

		return $http.put('/api/offers/' + id, offerData);
	};

	offerFactory.delete = function(id) {

		return $http.delete('/api/offers/' + id);
	};

	return offerFactory;
});