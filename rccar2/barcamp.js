var http = require('http');
var interval;
var i=0;
var exec = require('child_process').exec;

http.createServer(function (req,res){

res.write(200,{'Content-Type':'text/plain'});

interval = setInterval(function(){

if(i$2==0)
console.log('true');
else
console.log('false');
i=i+1;
}
,500);

res.end('Hello wordld\n');
}
).listen(1337,'192.168.43.82');
console.log('Server started');
