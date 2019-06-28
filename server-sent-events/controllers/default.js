exports.install = function() {
	ROUTE('GET /');
	ROUTE('GET /one-way-messaging/', view_SSE, ['sse']);
};

function view_SSE() {

	var self = this;
	var indexer = 0;
	var counter = parseInt(self.sseID || '0');

	console.log('Last event ID:', self.sseID);

	var interval = setInterval(function() {

		if (!self.isConnected) {
			clearInterval(interval);
			return;
		}

		/*
			Send data to client - One way messaging

			@data {String or Object}
			@eventname {String} :: default null
			@id {String} :: default null (Last Event ID)
			@retry {Number} :: in milliseconds, default CONF.default_request_timeout

			controller.sse(data, [eventname], [id], [retry])
		*/
		self.sse({ counter: counter++, message: GUID(10) }, null, counter);

		// reconnect by the @retry
		indexer++;
		if (indexer > 10) {
			clearInterval(interval);
			self.close();
		}

	}, 1000);

	/*
	self.res.on('close', function() {
		console.log('CLIENT DISCONNECT');
	});
	*/

}