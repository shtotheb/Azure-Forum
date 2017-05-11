angular.module('roomService', [])

.factory('Room', function($http) {

	var roomFactory = {};

	roomFactory.all = function() {
		return $http.get('/api/rooms/');
	};

	roomFactory.create = function(roomData) {
		return $http.post('/api/rooms/', roomData);
	};

	roomFactory.test = function() {
		var test = "works laa"
		return test;
	};

	return roomFactory;
});
