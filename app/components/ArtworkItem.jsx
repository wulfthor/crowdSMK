var dispatcher = require("./../dispatcher.js");
var artworkAction = require("./../stores/ArtworkItemActionCreator.jsx");
var React = require('react/addons');
var cx = React.addons.classSet;

module.exports = React.createClass({

	getInitialState: function(){
		return {
			input:''
		}
	},
	addItem:function(e){
		e.preventDefault();
        console.log("ontoact " + JSON.stringify(this.state.input));

		artworkAction.addtag({
			tags: this.state.input,
            user: "kurt",
            id:this.props.item._id
		});

		this.setState({
			input:''
		})
	},
	handleInputName:function(e){
		this.setState({input : e.target.value})
	},
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
					<div className="six columns"><h5>
						 {this.props.item.Artistname}
						 {this.props.item._id}
								{this.props.item.Title}
									{this.props.item.DateText}
										{this.props.item.Tags}</h5>
						<a href={this.props.item.Link}> <img src={this.props.item.Url} /></a>
						<form  onSubmit={this.addItem}>
							<input
								type="text"
								required
								value={this.state.input}
								onChange={this.handleInputName}
							/>
							<button>Add a new Item to the list</button>
						</form>
					</div>

				</div>
			</div>
		)
	}
});