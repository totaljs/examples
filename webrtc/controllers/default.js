exports.install = function() {
	ROUTE('/');
	WEBSOCKET('/', socket_homepage, ['json']);
};

function socket_homepage() {
	var self = this;

	self.on('open', function(client) {

		var pair = self.find(function(user) {
			return user.get.room === client.get.room && user.id !== client.id;
		});

		client.pair = pair;

		// We must waiting
		if (pair) {
			pair.pair = client;
			pair.send({ 'type': 'start-host' });
			client.send({ 'type': 'start-client' });
		}

	});

	self.on('close', function(client) {
		if (client.pair)
			client.pair.close();
	});

	self.on('message', function(client, message) {
		if (client.pair)
			client.pair.send(message);
	});
}