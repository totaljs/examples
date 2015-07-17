var pg = require('pg.js');

// override the framework prototype
// use CONFIG files for connection string
F.database = function(dbName, callback) {
    return new pg.connect('postgres://user:password@localhost:5432/' + dbName, callback);
};