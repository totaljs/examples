var framework = require('total.js');
var http = require('http');

var debug = true;

framework.run(http, debug);

// Documentation: http://docs.totaljs.com/Framework/#framework.test
framework.test(true, function() {
	console.log('SUCCESSS');
});