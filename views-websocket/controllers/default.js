exports.install = function() {
	ROUTE('/*', 'app');
	WEBSOCKET('/', reader, ['json']);
};

function reader() {
	var self = this;
	self.on('message', function(client, message) {
		switch (message.url) {
			case '/':
			case '/company/':
			case '/products/':
			case '/contact/':
				var view = message.url.replace(/\//g, '');
				if (!view)
					view = 'homepage';
				client.send({ status: 200, body: VIEW(view) });
				break;
			default:
				client.send({ status: 404 });
				break;
		}
	});
}