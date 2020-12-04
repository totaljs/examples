require('total4');

// Loads the framework without HTTP server
LOAD('config', function() {

	RESTBuilder.GET(CONF.url).stream(function(err, response) {

		if (err) {
			console.error(err);
			return process.exit();
		}

		var data = [];

		response.stream.on('data', U.streamer('<CD>', '</CD>', function(item) {
			data.push(item.parseXML());
		}));

		response.stream.on('end', function() {
			process.send(data);
			process.exit();
		});

	});
});