var mongoose = require('mongoose');
var usertagitem = require('./UserTagItem.js');

var ArtworkItemSchema = {
	_id:String,
	Artistname:String,
	Title:String,
	DateLatest:String,
	DateText:String,
	Url:String,
	Tags:[usertagitem],
	Ondisplay:Boolean,
}

var ArtworkItem = mongoose.model('ArtworkItem', ArtworkItemSchema, "artworks");
module.exports = ArtworkItem