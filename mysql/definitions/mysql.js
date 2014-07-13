var mysql = require('mysql');
var pool  = mysql.createPool({ host: 'example.org', user: 'bob', password: 'secret' });

// override the framework prototype
// use CONFIG files for connection string
framework.database = function(callback) {
	return pool.getConnection(callback);
};