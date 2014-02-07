var framework = require('total.js');
var http = require('http');
var debug = true;

framework.run(http, debug);

// INLINE ROUTING
framework.route('/', function() {
	this.plain('HOMEPAGE');
});