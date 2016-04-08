var dispatcher = require("./../dispatcher.js");
var artworkAction = require("./../stores/ArtworkItemActionCreator.jsx");
var React = require('react/addons');
var cx = React.addons.classSet;

module.exports = React.createClass({
	togglePurchased:function(e) {
		e.preventDefault();
		if (this.props.item.Ondisplay) {
			action.unbuy(this.props.item);

		} else {
			action.buy(this.props.item);
		}
	},
	delete: function(){
		e.preventDefault();
		action.delete(this.props.item);
	},
	render: function() {
		console.log("into awit");
		return (
			<div>
				<div className="artwork-item row">
					<div className="six columns">
						<h6> {this.props.item.Artistname} </h6>
						<h6> {this.props.item.Title} </h6>
						<h6> {this.props.item.DateLatest} </h6>
						<a href={this.props.item.Link}> <img src={this.props.item.Url} /></a>

					</div>
					<div>
						<form className="one columns" onsubmit={this.togglePurchased}>
							<button className={this.props.item.Ondisplay ? "" : "button-primary"}>{this.props.item.Ondisplay ? "Buy" : "Unbuy"}</button>
						</form>
					</div>
					<div>
						<form className="one columns" onsubmit={this.delete}>
							<button>&times;</button>
						</form>
					</div>

				</div>
			</div>
		)
	}
});