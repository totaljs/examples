var framework = require('total.js');
var http = require('http');

framework.run(http, false, process.env.OPENSHIFT_NODEJS_PORT, process.env.OPENSHIFT_NODEJS_IP);