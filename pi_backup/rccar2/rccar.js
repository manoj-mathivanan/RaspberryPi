var http = require('http');
var exec = require('child_process').exec;
var fointerval;
var forinterval;
var stinterval;
var i = 0;
var sp = 2;
var speed=1000;
exec("node try5.js");
exec("gpio mode 0 out");
exec("gpio mode 7 out");
exec("gpio mode 2 out");
exec("gpio mode 3 out");
http.createServer(function (req, res) {

  res.writeHead(200, {'Content-Type': 'text/plain'});
  var parts = req.url.split("/");
  var op = parts[1];
  if(op=="fo")
  {
   exec("gpio write 7 0");
   exec("gpio write 0 1");
   console.log('forward');
  }
  if(op=="ba")
  {
  exec("gpio write 0 0");
  exec("gpio write 7 1");
  console.log('backward');
  }
  if(op=="le")
  {
  exec("gpio write 2 0");
  exec("gpio write 3 0");
  exec("gpio write 2 1");
    console.log('left');
  }
  if(op=="ri")
  {
  exec("gpio write 3 0");
  exec("gpio write 2 0");
  exec("gpio write 3 1");
    console.log('right');
  }
  if(op=="st")
  {
  exec("gpio write 7 0");
  exec("gpio write 0 0");
  exec("gpio write 2 0");
  exec("gpio write 3 0");
    console.log('stop');
  }
if(op=="str")
{
  exec("gpio write 2 0");
  exec("gpio write 3 0");
}

  res.end('Hello World\n');
}).listen(1337, '192.168.43.129');
console.log('Server running at 1337');
