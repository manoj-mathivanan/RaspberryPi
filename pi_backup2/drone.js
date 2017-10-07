var http = require('http');
var exec = require('child_process').exec;
var arDrone = require('ar-drone');
var client  = arDrone.createClient();
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  var parts = req.url.split("/");
  var route = parts[1];
  if(route == "takeoff")
	{
		client.takeoff();
		res.end('takeoff');
		console.log('takeoff');
	}
  if(route == "front")
	{
		client.front(0.2);
		res.end('forward');
		console.log('forward');
	}
  if(route == "stop")
	{
		client.stop();
		res.end('stop');
		console.log('stop');
	}
  if(route == "land")
	{
		client.land();
		res.end('land');
		console.log('land');
	}
}).listen(1396, '192.168.1.2');
console.log('Server running at http://192.168.1.2:1396/');
