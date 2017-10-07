var http = require('http'),
    fs = require('fs');
fs.readFile('/home/pi/Desktop/rccar/trigger.html', function (err, html) {
    if (err) {
        throw err; 
    }       
    http.createServer(function(request, response) {  
        response.writeHeader(200, {"Content-Type": "text/html"});  
	response.writeHeader("Access-Control-Allow-Origin","*");
        response.write(html);  
        response.end();  
    }).listen(1336);
console.log('Server running');
});
