var MC = require('mongodb').MongoClient;
var DB = null;

MC.connect(CONFIG('database'), function(err, db) {
    if (err)
        throw err;
    DB = db;
});

framework.database = function(collection) {
    if (collection)
        return DB.collection(collection);
    return DB;
};