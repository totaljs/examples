// ===================================================
// IMPORTANT: only for development
// total.js - web application framework for node.js
// http://www.totaljs.com
// ===================================================

// Requirements: Total.js +v2.3.0
require('total.js').load('debug', ['models', 'workflows']);

// Async list
var samples = [];

// Empty instance of User
var user = CREATE('User');

samples.push(function(next) {
	console.log('---> begin $exec("user-save")');
	user.$exec('user-save', function(err, response) {
		console.log('---> end $exec("user-save") RESPONSE: ' + JSON.stringify(response));
		console.log();
		next();
	});
});

samples.push(function(next) {
	console.log('---> begin $exec("array-results")');
	user.$exec('array-results', function(err, response) {
		console.log('---> end $exec("array-results") RESPONSE: ' + JSON.stringify(response));
		console.log();
		next();
	});
});

samples.push(function(next) {
	console.log('---> begin $exec("user-query")');
	user.$exec('user-query', function(err, response) {
		console.log('---> end $exec("user-query") RESPONSE: ' + JSON.stringify(response));
		console.log();
		next();
	});
});

samples.push(function(next) {
	console.log('---> begin $exec("xml")');
	user.$exec('xml', function(err, response) {
		console.log('---> end $exec("xml") RESPONSE: ' + JSON.stringify(response));
		console.log();
		next();
	});
});

samples.async(function() {
	// Kills the app
	F.kill();
});