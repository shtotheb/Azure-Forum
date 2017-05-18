angular.module('roomCtrl', ['roomService'])

.controller('roomController', function(Room) {
	var vm = this;
	Room.all()
		.then(function(data) {
			vm.rooms = data;
	})
})

.controller('roomCreateController', function($location, Room) {
	var vm = this;
	vm.roomData = {};
	vm.saveRoom = function() {
		Room.create(vm.roomData)
		.then(function(data){
			$location.path('/rooms/' + data.data._id)
		})
	};
})

.controller('roomSingleController', function($routeParams, $scope, Room) {
	var vm = this;
	vm.roomData = {};
	vm.message = {};

	Room.view($routeParams.room_id)
	.then(function(data){
		vm.roomData = data
	})

	vm.saveChat = function(name) {
		vm.message.name = name;
		Room.chat($routeParams.room_id, vm.message)
		.then(function(data){
			vm.roomData = data
		})
	}
})
