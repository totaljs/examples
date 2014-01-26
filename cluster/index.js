var http = require('http');
var cluster = require('cluster');
var os = require('os');

var debug = true;

if (!cluster.isMaster) {

	// This code will be executed according the number of CPU
	// This code will be using: single process RAM * numCPUs
	var framework = require('total.js');

	// Set framework ID
	framework.on('message', function(message) {
		if (message.type === 'id')
			framework.id = message.id;
	});

	framework.run(http, debug);	
	console.log("http://{0}:{1}/".format(framework.ip, framework.port));
	return;
}

var numCPUs = os.cpus().length;

for (var i = 0; i < numCPUs; i++) {

	// Run framework
    var fork = cluster.fork();
    
    fork.on('message', onMessage);

    // Send ID
    fork.send({ type: 'id', id: i });
}

function onMessage(message) {
	console.log('Message ->', message);
}

// Use a terminal for testing:
// $ siege -b -r 10 http://127.0.0.1:8004/