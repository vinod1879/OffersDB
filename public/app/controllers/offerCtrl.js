angular.module('offerCtrl', ['offerService', 'ui.bootstrap']).controller('offerController', function(Offer) {

	var vm = this;

	vm.processing = true;

	vm.getAll = function() {

	Offer.all().success(function(data) {

			vm.processing = false;
			vm.offers = data;
		});
	};

	vm.getAll();

	vm.deleteOffer = function(id) {

		vm.processing = true;

		Offer.delete(id).success(function(data) {

			vm.getAll();
		}) ;
	};

	vm.getFormattedDate = function(input) {

		var obj = new Date(Date.parse(input));
		var str   = obj.getDate() + '-' + (obj.getMonth() + 1) + '-' + obj.getFullYear();

		return str;
	}

}).controller('offerCreateController', function(Offer) {

	var vm = this;

	vm.type = 'create';

	vm.saveOffer = function() {

		vm.processing = true;

		vm.message = '';

		Offer.create(vm.offerData).success(function(data) {

			vm.processing = false;
			vm.message = data.message;

			if(data.success) {
				vm.offerData = {};
			}
		});
	};
}).controller('offerEditController', function($routeParams, Offer) {

	var vm = this;

	vm.type = 'edit';

	Offer.get($routeParams.offer_id).success(function(data) {

		vm.offerData = data;
		vm.offerData.validFrom = new Date(Date.parse(vm.offerData.validFrom));
		vm.offerData.validTo = new Date(Date.parse(vm.offerData.validTo));
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