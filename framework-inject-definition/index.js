var framework = require('total.js');
var http = require('http');
var debug = true;

framework.on('load', function() {
	framework.injectDefinition('http://www.totaljs.com/inject-definition.js');
});

framework.run(http, debug);