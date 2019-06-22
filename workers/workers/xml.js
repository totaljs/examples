require('total.js');

// Loads the framework without HTTP server
LOAD('debug', ['config'], '../');

U.download(CONFIG('url'), ['get'], function(err, response) {

	if (err) {
		console.error(err);
		return process.exit();
	}

	var data = [];

	response.on('data', U.streamer('<CD>', '</CD>', function(item) {
		data.push(item.parseXML());
	}));

	response.on('end', function() {
		process.send(data);
		process.exit();
	});

});