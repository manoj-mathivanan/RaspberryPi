var http = require('http');
var exec = require('child_process').exec;
var forward=0;
var backward=0;
var left=0;
var right=0;
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
	forward=1;
	backward=0;
	sp = parts[2];
} 
 if(op=="ba")
{
	backward=1;
	forward=0;
	sp = parts[2];
}
if(op=="le")
{
	left=1;
	right=0;
}
if(op=="ri")
{
	right=1;
	left=0;
}
if(op=="st")
{
	forward=0;
	backward=0;
	left=0;
	right=0;
}
forinterval = setInterval(function(){
if(left==1)
	{exec("gpio write 2 1");}
else
	{exec("gpio write 2 0");}

if(right==1)
	{exec("gpio write 3 1");}
else
	{exec("gpio write 3 0");}

if(forward==1)
{
	if(i%sp==0)
		{exec("gpio write 0 1");		}
	else
		{exec("gpio write 0 0");}
	i=i+1;
	if(i==1000)	
		{i=0;}
}
else
	{exec("gpio write 0 0");}

if(backward==1)
{
        if(i%sp==0)
                {exec("gpio write 7 1");}
        else
                {exec("gpio write 7 0");}
        i=i+1;
        if(i==1000)
                {i=0;}
}
else
        {exec("gpio write 7 0");}

},1);

  res.end('Hello World\n');
}).listen(1337, '192.168.43.129');
console.log('Server running at 1337');
