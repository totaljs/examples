var framework = require('total.js');
var http = require('http');

// Debug mode = false
framework.run(http, false, parseInt(process.env.PORT || 5000), 'heroku');