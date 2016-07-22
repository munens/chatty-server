import React from 'react';


var Message = React.createClass({
	
	render: function () {

		return (

			<div className="message">

		      <span className="username">{this.props.message.username}</span>
		      <span className="content">{this.props.message.content}</span>

		    </div>
				
		);
		
	}

})

export default Message;