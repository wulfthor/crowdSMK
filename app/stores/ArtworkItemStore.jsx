"use strict";
let dispatcher = require("./../dispatcher.js");
let {get,post,del,patch} = require("./../RestHelper.js");

function ArtworkItemStore(){

	let artworkItems = [],
		changeListeners = [];

	function triggerListeners(){
		changeListeners.forEach(function(listener){
			listener(artworkItems)	;
		})
	};

	get("api/items")
	.then((data)=>{
		artworkItems = data;
		triggerListeners();
	});


	function removeArtworkItem(item){
		var index = artworkItems.findIndex(x => x._id===item._id);
		var removed = artworkItems.splice(index,1)[0];
		triggerListeners();

		del(`api/items/${item._id}`)
		.catch(()=>{
			artworkItems.splice(index,0,removed);
			triggerListeners();
		})
	}

	function addArtworkItem(item){
		var i = artworkItems.push(item);
		triggerListeners();

		post("/api/items",item)
		.then((g)=>{
			item._id = g._id;
		})
		.catch(()=>{
			artworkItems.splice(i,1);
		})
	}

	function setArtworkItemBought(item, isPurchased){
		var item = artworkItems.find(function(i){return i._id===item._id});
		item.purchased = isPurchased || false;;
		triggerListeners();

		patch(`api/items/${item._id}`,item);
	}

	function getArtworkItems(){
		return artworkItems;
	};

	function onChange(listener){
		changeListeners.push(listener);
	}

	dispatcher.register(function(event){
		var split = event.type.split(':');
		if (split[0]==='artwork-item'){
			switch(split[1]) {
				case "add":
					addArtworkItem(event.payload);
					break;
				case "delete":
					removeArtworkItem(event.payload);
					break;
				case "buy":
					setArtworkItemBought(event.payload, true);
					break;
				case "unbuy":
					setArtworkItemBought(event.payload, false);
					break;
			}
		}
	})


	return {
		getArtworkItems:getArtworkItems,
		onChange:onChange
	}
}

module.exports = new ArtworkItemStore();
