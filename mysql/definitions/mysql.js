var mysql = require('mysql');
var pool = mysql.createPool({ host: 'example.org', user: 'bob', password: 'secret' });

// override the framework prototype
// use CONFIG files for connection string
// "FUNC." is a global variable defined in Total.js

FUNC.mysql = function(callback) {
	return pool.getConnection(callback);
};