var bodyParser = require('body-parser');
var Room = require('../models/Room');
var jwt = require('jsonwebtoken');
var bytes = require('bytes');

module.exports = function(app, express) {

	var apiRouter = express.Router();

	apiRouter.get('/', function(req, res) {
		res.json({ message: 'hooray! welcome to our api!' });
	});

	apiRouter.route('/rooms')

		.post(function(req, res) {

			var room = new Room();
			room.roomName = req.body.roomName;

			room.save(function(err) {
				if (err) {
					if (err.code == 11000)
						return res.json({ success: false, message: 'A user with that username already exists. '});
					else
						return res.send(err);
				}

				res.json({
					message: 'User created!',
					roomName: req.body
			 });
			});

		})

		.get(function(req, res) {
			Room.find({}, function(err, data){
				if (err) res.send(err);
		    res.json(data);
			});
		})

	return apiRouter;
};
