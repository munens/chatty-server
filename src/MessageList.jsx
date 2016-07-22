import React from 'react';
import Message from './Message.jsx';

var MessageList = React.createClass({
		
	render: function () {

		return (

			<div id="message-list">

				{this.props.messages.map(function(message){	
					return <Message key={message.id} message={message} />
				})}

			</div>

		);
		
	}

})

export default MessageList;