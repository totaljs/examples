var framework = require('total.js');
var http = require('http');
var debug = true;

framework.on('load', function() {
	framework.injectSource('test', 'http://www.totaljs.com/inject-source.js');
});

framework.run(http, debug);