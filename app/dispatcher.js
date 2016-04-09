var listeners = {};
let guid = require('guid');

var dispatcher = {
	register(callback){
		var id = guid.raw();
		listeners[id] = callback;
		return id;
	},
	dispatch(payload){
		console.info('Dispatching...',payload);
		for (var id in listeners){
			console.log("id " + id);
			var listener = listeners[id];
			listener(payload);
		}
	}
};
module.exports = dispatcher;
