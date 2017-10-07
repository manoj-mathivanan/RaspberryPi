var sys = require('sys');
var http = require('http');
var exec = require('child_process').exec;
var i,box,intru;
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
 function puts(error, stdout, stderr) { i=stdout.slice(0,1); }
function boxfunc(error, stdout, stderr) { box=stdout.slice(0,1); }
function intrufunc(error, stdout, stderr) { intru=stdout.slice(0,1); }

exec("gpio read 1", puts);
exec("gpio read 4",intrufunc);
exec("gpio read 5",boxfunc);



if(i=="1")
{
console.log("fire");
res.writeHead(200, {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
  'Content-Type': 'text/html' });

res.write('<html><h1>Fire!!!</h1></html>');
res.end();
}
else if(intru==1)
{
console.log("intruder");
res.writeHead(200, {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
  'Content-Type': 'text/plain' });

res.write('<html><h1>Intruder!!!</h1></html>');
res.end();

}
else if(box==1)
{
console.log("box");
res.writeHead(200, {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
  'Content-Type': 'text/plain' });

res.write('<html><h1>Box!!!</h1></html>');
res.end();

}
else
{
console.log("safe");

res.writeHead(200, {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
  'Content-Type': 'text/html' });
res.write('<html><h1>safe</h1></html>');

res.end();
}
}).listen(1339, '192.168.43.129');
console.log('Server running at http://127.0.0.1:1339/');
