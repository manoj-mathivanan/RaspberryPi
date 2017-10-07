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

  if(req.method == "POST") {
  var requestBody = '';
	req.on('data', function(data) {
        requestBody += data;
      });
	var routes = '';
	req.on('end', function() {
        var formData = JSON.parse(requestBody);
        var routes = formData.route;
	flag=0;
	for(var i=0; i<routes.length;i++)
	{
var route = routes[i];
console.log(route);
		if(route.direction == "straight")
		{
		exec("gpio write 0 0");
		exec("gpio write 3 0");
		exec("gpio write 2 1");
		exec("gpio write 7 1");
		var rotations = Number(route.rotations)*1750;
		var date = new Date();
		var curDate = null;
		do{ curDate = new Date(); }
		while(curDate-date<rotations);
			exec("gpio write 0 1");
			exec("gpio write 3 1");
			exec("gpio write 7 1");
			exec("gpio write 2 1");
			
		}
		if(route.direction == "left")
		{
		exec("gpio write 0 0");
                exec("gpio write 7 1");
                exec("gpio write 2 1");
                exec("gpio write 3 1");
                var rotations = Number(route.rotations)*1400;
		console.log(rotations);
                var date = new Date();
                var curDate = null;
                do{ curDate = new Date(); }
                while(curDate-date<rotations);
                        exec("gpio write 0 1");
                        exec("gpio write 7 1");
                        exec("gpio write 2 1");
                        exec("gpio write 3 1");

		}
		if(route.direction == "right")
		{
		exec("gpio write 0 1");
                exec("gpio write 7 1");
                exec("gpio write 2 1");
                exec("gpio write 3 0");
		var rotations = Number(route.rotations)*1400;
                var date = new Date();
                var curDate = null;
                do{ curDate = new Date(); }
                while(curDate-date<rotations);
                        exec("gpio write 0 1");
                        exec("gpio write 7 1");
                        exec("gpio write 2 1");
                        exec("gpio write 3 1");

		}
		if(route.direction == "back")
		{
		exec("gpio write 7 0");
                exec("gpio write 2 0");
                exec("gpio write 0 1");
                exec("gpio write 3 1");
                var rotations = Number(route.rotations)*1300;
                var date = new Date();
                var curDate = null;
                do{ curDate = new Date(); }
                while(curDate-date<rotations);
                        exec("gpio write 7 1");
                        exec("gpio write 2 1");
                        exec("gpio write 0 1");
                        exec("gpio write 3 1");
		}
	
	}
	res.end('Got input\n');
      });
	
  }
 res.writeHead(200, {'Content-Type': 'text/plain'});
}).listen(1339, '192.168.42.1');
console.log('pick up car running at 1339');

