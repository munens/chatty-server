// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('node-uuid');

// Set the port to 4000
const PORT = 5000;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  
  console.log('Client connected');
  wss.clients.forEach((client) => {
    client.send(JSON.stringify({type: 'clientNo', noOfClients: wss.clients.length}))
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {

    wss.clients.forEach((client) => {
      client.send(JSON.stringify({type: 'clientNo', noOfClients: wss.clients.length}))
    });
    console.log('Client disconnected');

  });

  ws.on('message', (message) => {

  	var messageObj = JSON.parse(message);
  	
    if(messageObj.type === "postNotification"){

      messageObj.type = "incomingNotification";
      wss.clients.forEach((client) => {
        client.send(JSON.stringify(messageObj));
      });

    } else if(messageObj.type === "postMessage"){

      messageObj.id = uuid.v1();
      messageObj.type = "incomingMessage";
            
      wss.clients.forEach((client) => {
        client.send(JSON.stringify(messageObj));
      });

    }
  	
  });

});


