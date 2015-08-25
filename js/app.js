angular.module('offersDB', []).controller('mainController', function() {

	var vm = this;

	vm.message = 'Hey there! Come and see how good I look!';

	vm.computers = [{name: 'Macbook Pro', color: 'Silver', nerdness: 7},
					{name: 'Yoga 2 Pro', color: 'Gray', nerdness: 6},
					{name: 'Chromebook', color: 'Black', nerdness: 5}];

	vm.computerData = {};

	vm.addComputer = function() {

		vm.computers.push({
			name: vm.computerData.name,
			color: vm.computerData.color,
			nerdness: vm.computerData.nerdness
		});

		vm.computerData = {};
	};
});