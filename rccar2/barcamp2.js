var http = require('http');
var interval;
var i=0;
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});

interval = setInterval(function(){

if(i%2==0)
{
console.log('on');
}
else
{
console.log('off');
}
i++;

},1000);

  res.end('Hello World\n');
}).listen(1337, '192.168.43.82');
console.log('Server running');
