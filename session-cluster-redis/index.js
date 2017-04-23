var http = require('http');
var cluster = require('cluster');
var os = require('os');

var debug = true;

if (!cluster.isMaster) {

	// This code will be executed according the number of CPU
	// This code will be using: single process RAM * numCPUs
	require('total.js');

	// Set framework ID
	F.on('message', function(message) {
		if (message.type === 'id')
			F.id = message.id;
	});

    F.http('debug');
	return;
}else{
	//Varun Batra <codevarun@gmail.com> Removed bug for cluster.fork is not a function since cluster isn't a master once forked. 
	var numCPUs = os.cpus().length;

	for (var i = 0; i < numCPUs; i++) {

		// Run framework
	    var fork = cluster.fork();

	    fork.on('message', onMessage);

	    // Send ID
	    fork.send({ type: 'id', id: i });
	}
}
console.log('The cluster is running.');

function onMessage(message) {
	console.log('Message ->', message);
}

// Use a terminal for testing:
// $ siege -b -r 10 http://127.0.0.1:8000/
