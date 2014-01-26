var framework = require('total.js');
var http = require('http');
var debug = true;

framework.on('load', function() {
	framework.injectModule('test', 'http://www.totaljs.com/inject-module.js');
});

framework.run(http, debug);