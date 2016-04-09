var dispatcher = require("./../dispatcher.js");

module.exports = {
	add:function(item){
		dispatcher.dispatch({
			type:"artwork-item:add",
			payload:item
		})
	},
	addtag:function(item){
		dispatcher.dispatch({
			type:"artwork-item:addtag",
			payload:item
		})
	},
	buy:function(item){
		dispatcher.dispatch({
			type:"artwork-item:buy",
			payload:item
		})
	},
	unbuy:function(item){
		dispatcher.dispatch({
			type:"artwork-item:unbuy",
			payload:item
		})
	},
	delete:function(item){
		dispatcher.dispatch({
			type:"artwork-item:delete",
			payload:item
		});
	}

}
