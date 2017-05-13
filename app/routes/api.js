var bodyParser = require('body-parser');
var Room = require('../models/Room');
var User = require('../models/User');
var jwt = require('jsonwebtoken');
var bytes = require('bytes');

var superSecret = 'shitissaltedson'

module.exports = function(app, express) {

	var apiRouter = express.Router();

	apiRouter.post('/authenticate', function(req, res) {

	  User.findOne({
	    username: req.body.username
	  }).select('name username password').exec(function(err, user) {

	    if (err) throw err;

	    if (!user) {
	      res.json({
	      	success: false,
	      	message: 'Authentication failed. User not found.'
	    	});
	    } else if (user) {

	      var validPassword = user.comparePassword(req.body.password);
	      if (!validPassword) {
	        res.json({
	        	success: false,
	        	message: 'Authentication failed. Wrong password.'
	      	});
	      } else {

	        var token = jwt.sign({
	        	name: user.name,
	        	username: user.username
	        }, superSecret, {
	          expiresIn: '24h'
	        });

	        res.json({
	          success: true,
	          message: 'Enjoy your token!',
	          token: token
	        });
	      }

	    }

	  });
	});

	apiRouter.route('/signup')
		.post(function(req, res) {
			var user = new User();
			user.name = req.body.name;
			user.username = req.body.username;
			user.password = req.body.password;
			user.save(function(err) {
				if (err) {
					if (err.code == 11000)
						return res.json({ success: false, message: 'A user with that username already exists. '});
					else
						return res.send(err);
				}
				res.json({ message: 'User created!' });
			});
		})


	apiRouter.use(function(req, res, next) {
		console.log('Somebody just came to our app!');

		var token = req.body.token || req.query.token || req.headers['x-access-token'];

		if (token) {

			jwt.verify(token, superSecret, function(err, decoded) {
				if (err) {
					res.status(403).send({
						success: false,
						message: 'Failed to authenticate token.'
				});
				} else {
					req.decoded = decoded;
					next();
				}
			});
		} else {
			res.status(403).send({
				success: false,
				message: 'No token provided.'
			});

		}
	});

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
