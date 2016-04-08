var mongoose = require('mongoose');

var UserTagItemSchema = {
    Author:String,
    Tags:String,
    RelatedArtwork:String,
    CreatedOn: {type: Date, "default": Date.now}
}

var UserTagItem = mongoose.model('UserTagItem', UserTagItemSchema, "usertags");
module.exports = UserTagItem;