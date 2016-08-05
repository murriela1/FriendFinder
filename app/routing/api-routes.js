// API Routes
// =============================================================

// First, load the data from friends.js
var friendsList = require('../data/friends.js');
var bodyParser = require('body-parser');
var path = require('path');


// Creating Routes
module.exports = function(app) {

	// Search for Specific Character (or all characters) - provides JSON
	app.get('/api/friends', function(req, res){
		res.status(200).json({message: 'connected.'})
		res.json(friendsList);
	});

	// Create New Characters - takes in JSON input
	app.post('/api/friends', function(req, res){
		//res.json(true);
		//console.log(req.body);
		//console.log(friendsList);

		//functions to return best match
		var bestMatch = {
			'name': 'none',
			'photo': 'none'
		};

		function sum (array) {
			var total = 0;
			for (var n = 0; n < array.length; n++) {
				total += parseInt(array[n]);
				//console.log(array[n]);
				//console.log(parseInt(total));
			}
			return total;
		}

		var userTotal = sum(req.body.scores);


		console.log(userTotal);

		var friendTotal = 0;

		for (var i = 0; i < friendsList.length; i++) {
			friendTotal = sum(friendsList[i].scores);
			//console.log(friendTotal);
			if (friendTotal == userTotal) {
				bestMatch.name = friendsList[i].name;
				bestMatch.photo = friendsList[i].photo;
			}
		};

		if (bestMatch.name == 'none') {
			var closest = 50;

			for (var i = 0; i < friendsList.length; i++) {
				friendTotal = sum(friendsList[i].scores);
				var difference = Math.abs(friendTotal - userTotal);
				if ( difference <= closest ){
					closest = difference;
					bestMatch.name = friendsList[i].name;
					bestMatch.photo = friendsList[i].photo;
				};
			};
		};
		console.log(bestMatch);
		res.json(bestMatch);

	});

};