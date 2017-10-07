var sys = require('sys'); 
var http = require('http'); 
var exec = require('child_process').exec; 
var fs = require('fs');
var i=5;
var prev=2; 
exec("gpio mode 7 in");
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
 function puts(error, stdout, stderr) { i=stdout.slice(0,1); } exec("gpio read 7", puts); if(i=="1") { 
 res.end('1');
console.log('1');
}
else { 
console.log('0');
res.end('0');
}
}).listen(1310, '0.0.0.0');

console.log('Server running at 1310/');
