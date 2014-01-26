var framework = require('total.js');
var http = require('http');

// static cache works in release mode
var debug = false;

framework.run(http, debug);