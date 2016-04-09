"use strict";

let dispatcher = require('./dispatcher.js');
let ArtworkItemList = require('./components/ArtworkItemList.jsx');
let React = require('react/addons');
let artworkItemStore = require('./stores/ArtworkItemStore.jsx');

var initial = artworkItemStore.getArtworkItems();

/*
ArtworkItemStore.onChange(()=>{
	items = ArtworkItemStore.getArtworkItems();
	render();
})
*/

artworkItemStore.onChange(function(items) {
	initial = items;
	render();
})

function render(){
	React.render(<ArtworkItemList items={initial}/>,mount);
}
