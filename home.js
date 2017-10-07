var http = require('http');
var exec = require('child_process').exec;
http.createServer(function (req, res) {

  res.writeHead(200, {'Content-Type': 'text/plain'});
  var parts = req.url.split("/");
  var ex = parts[1].split("-");
	
	var exec_call = ex[0] + " " + ex[1] + " " + ex[2] + " " + ex[3];

console.log(exec_call);

exec(exec_call);


  res.end('Hello World\n');
}).listen(1337, '192.168.43.82');
console.log('Server running at 1337');
