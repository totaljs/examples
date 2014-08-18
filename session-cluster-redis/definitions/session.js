var redis = require('redis');

// Install session module
INSTALL('module', 'https://modules.totaljs.com/session/v1.00/session.js');

// Configure session module with REDIS
framework.on('install', function(type, name) {

    if (type !== 'module')
        return;

    if (name !== 'session')
        return;

    var session = MODULE('session').instance;

    session.onRead = function(id, callback) {
        var client = redis.createClient();
        client.get('session_' + id, function(err, reply) {
            client.quit();
            callback(err ? {} : reply === null ? {} : JSON.parse(reply.toString()));
        });
    };

    session.onWrite = function(id, value) {
        var client = redis.createClient();
        client.set('session_' + id, JSON.stringify(value));
        client.quit();
    };
});