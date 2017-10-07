var exec = require('child_process').exec;

setInterval(function () {
exec("gpio write 3 0");
}, 3000);
