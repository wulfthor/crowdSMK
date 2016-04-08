var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    name: { type: String, default: '' },
    email: { type: String, default: '' },
    username: { type: String, default: '' }
});

var UserItem = mongoose.model('UserItem', UserItemSchema, "users");
module.exports = UserItem;
