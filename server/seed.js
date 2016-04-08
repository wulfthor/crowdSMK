let mongoose = require('mongoose');
let ArtworkItem = require('./models/ArtworkItem.js');

mongoose.connection.db.dropDatabase();

var initial = [{
	name:"Ice Cream"
},{
	name:"Waffles"
},{
	name:"Candy",
	purchased:true
},{
	name:"Snarks"
}];

initial.forEach(function(item){
	new ArtworkItem(item).save();
});
