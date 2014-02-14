var framework = require('total.js');
var http = require('http');
var debug = true;

framework.on('load', function() {
	framework.injectModel('user', 'http://www.totaljs.com/inject-model.js');
});

framework.run(http, debug);