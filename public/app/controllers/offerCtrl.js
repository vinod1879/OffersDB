angular.module('offerCtrl', ['offerService', 'ui.bootstrap']).controller('offerController', function(Offer) {

	var vm = this;

	vm.processing = true;

	Offer.all().success(function(data) {

		vm.processing = false;
		vm.offers = data;
	});

	vm.deleteOffer = function(id) {

		vm.processing = true;

		Offer.delete(id).success(function(data) {

			Offer.all().success(function(data) {

				vm.processing = false;
				vm.offers = data;
			});
		}) ;
	};
}).controller('offerCreateController', function(Offer) {

	var vm = this;

	vm.type = 'create';

	vm.saveOffer = function() {

		vm.processing = true;

		vm.message = '';

		Offer.create(vm.offerData).success(function(data) {

			vm.processing = false;
			vm.offerData = {};
			vm.message = data.message;
		});
	};
}).controller('offerEditController', function($routeParams, Offer) {

	var vm = this;

	vm.type = 'edit';

	Offer.get($routeParams.offer_id).success(function(data) {

		vm.offerData = data;
	});

	vm.saveOffer = function() {

		vm.processing = true;
		vm.message = '';

		Offer.update($routeParams.offer_id, vm.offerData).success(function(data) {

			vm.processing = false;
			vm.offerData = {};
			vm.message = data.message;
		});
	};
});