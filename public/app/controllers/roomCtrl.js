angular.module('roomCtrl', ['roomService'])

.controller('roomController', function(Room) {
	var vm = this;
	Room.all()
		.then(function(data) {
			vm.rooms = data;
	})
})

.controller('roomCreateController', function(Room) {
	var vm = this;
	vm.roomData = {};
	vm.saveRoom = function() {
		Room.create(vm.roomData)
		.then(function(data){
			vm.roomname = vm.roomData.roomName;
		})
	};
})
