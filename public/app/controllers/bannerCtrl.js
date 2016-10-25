angular.module('bannerCtrl', ['bannerService']).controller('bannerController', function(Banner) {

	var vm = this;

	vm.processing = true;

	Banner.all().success(function(data) {

		vm.processing = false;
		vm.banners = data;
	});

	vm.deleteBanner = function(id) {

		if (confirm("Sure you want to delete this banner?")) {

			vm.processing = true;

			Banner.delete(id).success(function(data) {

				Banner.all().success(function(data) {

					vm.processing = false;
					vm.banners = data;
				});
			});
		}
	};
	
}).controller('bannerCreateController', function(Banner) {

	var vm = this;

	vm.type = 'create';

	vm.saveBanner = function() {

		vm.processing = true;

		vm.message = '';

		Banner.create(vm.bannerData).success(function(data) {

			vm.processing = false;
			vm.message = data.message;

			if(data.success)
			{
				vm.bannerData = {};
			}
		});
	};
}).controller('bannerEditController', function($routeParams, Banner) {

	var vm = this;

	vm.type = 'edit';

	Banner.get($routeParams.banner_id).success(function(data) {

		vm.bannerData = data;
	});

	vm.saveBanner = function() {

		vm.processing = true;
		vm.message = '';

		Banner.update($routeParams.banner_id, vm.bannerData).success(function(data) {

			vm.processing = false;
			vm.bannerData = {};
			vm.message = data.message;
		});
	};
});