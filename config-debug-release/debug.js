var framework = require('total.js');
var http = require('http');
var debug = true;

framework.run(http, debug);

// if debug == true
// 	  framework load config-debug
// else
//    framework load config-release
//
// or
//
// framework.run(http, { debug: true, name: 'TEST' }, port);