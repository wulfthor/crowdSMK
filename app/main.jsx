"use strict";

let dispatcher = require('./dispatcher.js');
let ArtworkItemList = require('./components/ArtworkItemList.jsx');
let React = require('react/addons');
let ArtworkItemStore = require('./stores/ArtworkItemStore.jsx');

var items = ArtworkItemStore.getArtworkItems();

ArtworkItemStore.onChange(()=>{
	items = ArtworkItemStore.getArtworkItems();
	render();
})
function render(){
	React.render(<ArtworkItemList items={items}/>,mount);
}
