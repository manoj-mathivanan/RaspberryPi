var sys = require('sys');
var http = require('http');
var exec = require('child_process').exec;
var i;
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
 function puts(error, stdout, stderr) { i=stdout.slice(0,1); }
exec("gpio read 1", puts);
if(i=="1")
{
console.log("fire");
res.end('<html><h1>Fire</h1></html>');
}
else
{
res.end('Safe\n');
}
}).listen(1339, '192.168.43.129');
console.log('Server running at http://127.0.0.1:1339/');
