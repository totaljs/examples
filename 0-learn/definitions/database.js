var MC = require('mongodb').MongoClient;
var DB = null;
var Addons = require('mongodb-addons');

MC.connect(CONFIG('database'), function(err, db) {
    if (err)
        F.error(err);
    DB = db;
});

F.database = function(collection) {
    if (collection)
        return DB.collection(collection);
    return DB;
};