exports.install = function() {
	ROUTE('GET    /*', 'app');
	ROUTE('SOCKET /', reader);
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
				client.send({ status: 200, body: VIEW(view || 'homepage') });
				break;
			default:
				client.send({ status: 404 });
				break;
		}
	});
}