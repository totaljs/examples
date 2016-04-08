exports.install = function() {
	F.route('/*', 'app');
	F.websocket('/', reader, ['json']);
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
				client.send({ status: 200, body: F.view(view) });
				break;
			default:
				client.send({ status: 404 });
				break;
		}
	});
}