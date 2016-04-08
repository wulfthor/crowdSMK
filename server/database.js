var mongoose = require('mongoose');

mongoose.set('debug', true);

mongoose.connect('mongodb://localhost/smk', function() {
	console.log("connected to db");
});