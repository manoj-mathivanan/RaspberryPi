#!/usr/bin/env node
//sudo date -s "Thu June  25 07:10:00 UTC 2015"

var exec = require('child_process').exec;
 
var connectionAttempt = 0;

var pinNumber = "gpio";

exec("gpio mode 7 out");
exec("gpio mode 6 out");
exec("gpio mode 5 out");
exec("gpio mode 1 out");
exec("gpio mode 3 out");
exec("gpio mode 4 out");
exec("node check.js");
 exec("gpio write 1 1");
 exec("gpio write 3 0");
 exec("gpio write 7 0");
 exec("gpio write 6 0");
 exec("gpio write 5 0");
 exec("gpio write 4 0");

var WebSocketClient = require('websocket').client;

var client = new WebSocketClient();

var testing = "testing";

/*
process.on('uncaughtException', function(err) {
  console.log(err);
   exec("gpio write 1 1");
   exec("gpio write 3 0");
client.abort();
client.connect('wss://rtdsdccsademo.hana.ondemand.com/rtd/rtd');
});
*/

client.on('connectFailed', function(error) {
    console.log('Connect Error: ' + error.toString());
    exec("gpio write 3 0");
    exec("gpio write 1 1");
	client.abort();
    client.connect('wss://rtdsdccsademo.hana.ondemand.com/rtd/rtd');
});
 
client.on('connect', function(connection) {

/*
setInterval(function () {
 if(testing.indexOf("testing") > -1)
{
 exec("gpio write 1 0");
 exec("gpio write 3 1");
  connection.sendUTF("testing");
 testing = "sent";
}
else
{
testing = "reset";
exec("gpio write 1 1");
exec("gpio write 3 0");
console.log("Attempting Connection timer");
client.abort();
 client.connect('wss://rtdsdccsademo.hana.ondemand.com/rtd/rtd');
}

}, 7000);
*/

    console.log('WebSocket Client Connected');
setInterval(function () {
 connection.sendUTF("sending");
}, 4000);


connection.sendUTF("testing");

   // exec("gpio write 1 0");
   // exec("gpio write 3 1");
    connection.on('error', function(error) {
        console.log("Connection Error: " + error.toString());
	exec("gpio write 1 1");
	exec("gpio write 3 0");
        client.abort();
        client.connect('wss://rtdsdccsademo.hana.ondemand.com/rtd/rtd');
	/*if(connectionAttempt<3)
	{
	connectionAttempt++;
	console.log("Attempting connection");
	client.connect('wss://rtdsdccsademo.hana.ondemand.com/rtd/rtd');
	}*/
    });

    connection.on('close', function() {
        console.log('echo-protocol Connection Closed');
        client.abort();
        exec("gpio write 1 1");
        exec("gpio write 3 0");
	client.abort();
 	client.connect('wss://rtdsdccsademo.hana.ondemand.com/rtd/rtd');
    }); //7 6 5

    connection.on('message', function(message) {
	testing = "testing";        
        connectionAttempt = 0;
	exec("gpio write 3 0");
 	exec("gpio write 3 1");
	exec("gpio write 1 0");
	if(message.utf8Data.indexOf(pinNumber) > -1)
	{
		var jsonObj = JSON.parse(message.utf8Data);
        	var command = jsonObj.pinNumber;
        	console.log("Received: '" +command+ "'");
        	exec(command);
	}
	else
	{
		console.log("Wrong command: " + message.utf8Data);
	}
    });
    
});
 
client.connect('wss://rtdsdccsademo.hana.ondemand.com/rtd/rtd');
