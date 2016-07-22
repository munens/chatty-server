import React from 'react';

var ChatBar = React.createClass({
	
	getInitialState: function () {
		return {name: this.props.currentUser.name, value: ""};
	},

	updateValue: function(value){

	},

	handleKeyPress: function(event, content){
		
		if(event.keyCode === 13){
		
			console.log('enter!');
			this.props.onSubmit(this.state.name, event.target.value);
			this.setState({value: ""});

		}

	},

	handleChange: function(event){

		var content = event.target.value;
		this.setState({value: content });

	},

	handleNameChange: function(event){

		var newName = event.target.value;
		this.setState({name: newName });

	},

	render: function () {

		return (
			
			<footer>

    			<input id="username" type="text" value={this.state.name} onChange={this.handleNameChange} />

    			<input id="new-message" type="text" placeholder="Type a message and hit ENTER"
    			 value={this.state.value} onChange={this.handleChange} onKeyDown={this.handleKeyPress}  />
    			 
  			</footer>

		)
	}

})

export default ChatBar;