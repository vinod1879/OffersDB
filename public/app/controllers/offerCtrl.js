angular.module('offerCtrl', ['offerService']).controller('offerController', function(Offer) {

	var vm = this;

	vm.processing = true;

	Offer.all().success(function(data) {

		vm.processing = false;
		vm.offers = data;
	});
})