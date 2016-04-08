//"use strict";

var express = require('express');
var cors = require('cors');
var parser = require('body-parser');
var ArtworkItem = require('./models/ArtworkItem.js');
var React = require('react/addons');
require('babel/register');

require('./database.js');

var app = new express();

app.use(cors())
.use(parser.urlencoded({ extended: false }))
.use(parser.json())
.get('/',function(req,res){

		var app = React.createFactory(require('./../app/components/ArtworkItemList.jsx'));
		ArtworkItem.find(function(error,doc){
			var generated = React.renderToString(app({
				items:doc
			}));
			res.render('./../app/index.ejs',{reactOutput:generated});
		})
})
.use(express.static(__dirname + '/../.tmp'))
.listen(7777);

require('./routes/items.js')(app);
module.exports = app;
