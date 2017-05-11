var bodyParser = require('body-parser');
var Room = require('../models/Room');
var jwt = require('jsonwebtoken');
var bytes = require('bytes');

module.exports = function(app, express) {

	var apiRouter = express.Router();

	apiRouter.route('/')
		.get(function(req, res) {
			res.json({ message: 'hooray! welcome to our api!' });
		});

	apiRouter.route('/rooms')
		.post(function(req, res) {

			var room = new Room();
			room.roomName = req.body.roomName;

			room.save(function(err) {
				if (err) {
						return res.send(err);
				}

				res.json({
					message: 'User created!',
					roomName: req.body.roomName
			 });
			});

		})
		.get(function(req, res) {
			Room.find({}, function(err, data){
				if (err) res.send(err);
		    res.json(data);
			});
		})

	apiRouter.route('/rooms/:room_id')
		.get(function(req, res) {
			Room.findById(req.params.room_id, function(err, room){
				if (err) res.send(err);
				res.json(room);
			});
		})
		.put(function(req, res) {
			Room.findById(req.params.room_id, function(err, room){
				if (err) res.send(err);
				room.chats.push({
					message: req.body.newMessage
				})

				room.save(function(err, data) {
					if (err) res.send(err);
					res.json(data);
				});

			})
		})

	return apiRouter;
};
