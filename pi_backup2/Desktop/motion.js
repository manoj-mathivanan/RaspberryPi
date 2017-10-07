var client       = require('http');
var sys = require('sys'); 
var fs = require('fs'); 
var i=5;
var prev=2;
for(var j=0;j<10;j++)
{
j--;
var options = {
            hostname: 'localhost',
            path: '/',
            method: 'GET', //POST,PUT,DELETE etc
            port: 1310,
            headers: {} //
          };
    //handle request;
pRequest    = client.request(options, function(response){
console.log("Code: "+response.statusCode+ "\n Headers: "+response.headers);
response.on('data', function (chunk) {
      console.log(chunk);
});
response.on('end',function(){
      console.log("\nResponse ended\n");
});
response.on('error', function(err){
      console.log("Error Occurred: "+err.message);
});
 
});
      if(prev!=i)
        {
                var date = new Date();
                var data = date + " status = " + i + "\n";
                console.log(data);
                fs.appendFileSync("/home/pi/Desktop/motion.txt",data);
                prev=i;
        }
console.log(i);
 var date = new Date();
 var curDate = null;
 do{ curDate = new Date(); }
 while(curDate-date<3000);
}
