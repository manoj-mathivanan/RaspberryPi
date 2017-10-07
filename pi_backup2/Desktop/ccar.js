var http = require('http');
var exec = require('child_process').exec;
exec("gpio mode 0 out");
exec("gpio mode 7 out");
exec("gpio mode 2 out");
exec("gpio mode 3 out");
exec("gpio write 0 1");
exec("gpio write 7 1");
exec("gpio write 2 1");
exec("gpio write 3 1");
var flag = 0;
http.createServer(function (req, res) {
  var parts = req.url.split("/");
  var route = parts[1];
console.log(route);
		if(route == "up")
		{
		exec("gpio write 0 0");
		exec("gpio write 3 0");
		exec("gpio write 2 1");
		exec("gpio write 7 1");
		}
		if(route == "left")
		{
		exec("gpio write 0 0");
                exec("gpio write 7 1");
                exec("gpio write 2 1");
                exec("gpio write 3 1");
		}
		if(route == "right")
		{
		exec("gpio write 0 1");
                exec("gpio write 7 1");
                exec("gpio write 2 1");
                exec("gpio write 3 0");
		}
 if(route == "leftdown")
                {
                exec("gpio write 3 1");
                exec("gpio write 7 1");
                exec("gpio write 2 1");
                exec("gpio write 7 0");
                }
 if(route == "rightdown")
                {
                exec("gpio write 0 1");
                exec("gpio write 7 1");
                exec("gpio write 3 1");
                exec("gpio write 2 0");
                }

		if(route == "down")
		{
		exec("gpio write 7 0");
                exec("gpio write 2 0");
                exec("gpio write 0 1");
                exec("gpio write 3 1");
		}
		if(route == "stop")
                {
                exec("gpio write 0 1");
                exec("gpio write 3 1");
                exec("gpio write 7 1");
                exec("gpio write 2 1");
                }
	
	res.end('Got input\n');
	
 res.writeHead(200, {'Content-Type': 'text/plain'});
}).listen(1398, '0.0.0.0');
console.log('pick up car running at 1398');

