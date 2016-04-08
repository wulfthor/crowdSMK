"use strict";

let ArtworkItem = require('./ArtworkItem.jsx'),
	ArtworkListAddItem = require('./ArtworkListAddItem.jsx'),
	React = require('react/addons');

module.exports = React.createClass({

	render:function(){
		return (
			<div>
				{this.props.items.map((item,index)=>{
					return (
						<ArtworkItem item={item} key={"item"+index} />
					)
				})}
				<ArtworkListAddItem />
			</div>
		)
	}
})
