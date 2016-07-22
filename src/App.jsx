import React from 'react';
import MessageList from './MessageList.jsx';
import Message from './Message.jsx';
import ChatBar from './ChatBar.jsx';

var data = {
  currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
  messages: [
    {
      id: 1,
      username: "Bob",
      content: "Has anyone seen my marbles?",
    },
    {	
      id: 2,
      username: "Anonymous",
      content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
    }
  ]
};

var App = React.createClass({

	getInitialState: function () {
		
		return data = {

			currentUser: {name: "Bob"},
			messages: [], //messages stored from the server are stored here as they arrive.
			noOfUsers: 0

		}

	},

	onSubmit: function(name, value) {

		if(this.state.currentUser.name !== name){
			this.socket.send(JSON.stringify({type:'postNotification', content: this.state.currentUser.name + " has changed their name to " + name + "."}));
			this.socket.send(JSON.stringify({type: "postMessage", username: name , content: value}));
		} else {
			this.socket.send(JSON.stringify({type: "postMessage", username: name , content: value}));
		}

	},

	componentDidMount: function () {

		this.socket = new WebSocket("ws://localhost:5000/socketserver")
		this.setState(data);

		this.socket.onmessage = (event) => {
						
			var dataObj = JSON.parse(event.data);

			if(dataObj.type === 'clientNo'){
				this.setState({noOfUsers: dataObj.noOfClients});
			} else {
				var newMessages = this.state.messages;
				newMessages.push(dataObj);
				this.setState({currentUser: {name: dataObj.username} ,messages: newMessages});
			}

		}

	},

	render : function () {
		
		return (
			
			<div className="wrapper">
			  
			  <nav>
	    		<h1>Chatty</h1>
	    		<span id='clients'>{this.state.noOfUsers} user(s) online </span>
	  		  </nav>
	  	
	  		  <MessageList
	  		  	messages={this.state.messages}
	  		  />

	  		  <ChatBar 
	  		  	currentUser={this.state.currentUser}
	  		  	onSubmit={this.onSubmit}
	  		  />

	  		</div>

		);
	}



})

export default App;
