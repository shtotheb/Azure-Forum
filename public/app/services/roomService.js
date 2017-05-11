angular.module('roomService', [])

.factory('Room', function($http) {

	var roomFactory = {};

	roomFactory.all = function() {
		return $http.get('/api/rooms/');
	};

	roomFactory.create = function(roomData) {
		return $http.post('/api/rooms/', roomData);
	};

	roomFactory.view = function(room_id) {
		return $http.get('api/rooms/' + room_id);
	}

	roomFactory.chat = function(room_id, message) {
		return $http.put('api/rooms/' + room_id, message);
	}

	return roomFactory;
});
