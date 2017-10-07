var http = require('http');
var exec = require('child_process').exec;

var i1 = 1;
var i2 = 1;
var i3 = 1;
var i4 = 1;

var result = "200";

exec("gpio mode 1 up");
exec("gpio mode 2 up");
exec("gpio mode 3 up");
exec("gpio mode 4 up");

exec("gpio mode 1 in");
exec("gpio mode 2 in");
exec("gpio mode 3 in");
exec("gpio mode 4 in");


http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});

 function puts1(error, stdout, stderr) { i1=stdout.slice(0,1); }
 exec("gpio read 1", puts1);  

 function puts2(error, stdout, stderr) { i2=stdout.slice(0,1); }
 exec("gpio read 2", puts2);

 function puts3(error, stdout, stderr) { i3=stdout.slice(0,1); }
 exec("gpio read 3", puts3);

 function puts4(error, stdout, stderr) { i4=stdout.slice(0,1); }
 exec("gpio read 4", puts4);


console.log(i1 + "  " + i2 + "  " + i3 + "  " + i4);
 
 if(i4=="0")
 {
  result = "100";
 }
 else if(i3=="0")
 {
  result = "90";
 }
 else if(i2=="0")
 {
  result = "60";
 }
 else if(i1=="0")
 {
  result = "30";
 }
 else
 {
  result = "0";
 }

i1=1;
i2=1;
i3=1;
i4=1;

res.end(result);
 
}).listen(1337, '192.168.43.190');
