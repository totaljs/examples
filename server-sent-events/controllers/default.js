exports.install = function() {
	ROUTE('GET /');
	ROUTE('GET /sse/', serversentevents, ['sse']);
};

function serversentevents() {

	var self = this;
	var lasteventid = self.sseID || '0';
	var counter = U.parseInt(lasteventid);
	var indexer = 0;

	var interval = setInterval(function() {

		// Closes client after 10 seconds
		if (indexer++ > 10) {
			self.close();
			clearInterval(interval);
		} else {
			// Sends data to the client
			if (!self.sse({ counter: counter++, message: GUID() }, null, counter)) {
				// Something wrong
				clearInterval(interval);
			}
		}

	}, 1000);

	// self.res.on('close', () => console.log('Client is closed'));
}