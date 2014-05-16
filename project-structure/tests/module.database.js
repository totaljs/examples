var assert = require('assert');

exports.run = function(framework, name) {

    var db = MODULE('database');

    framework.assert('Read test data from database.', function(next, name) {
        db.find('test', {}, function(err, data) {
            assert.ok(data.length === 50, name);
            next();
        });
    });

};