var MC = require('mongodb').MongoClient;
var DB = null;

MC.connect(CONFIG('database'), function(err, db) {
	if (err)
		throw err;
	DB = db;
});

F.database = function(collection) {
	return collection ? DB.collection(collection) : DB;
};