exports.install = function() {
    framework.route('/*', view_app);
    framework.websocket('/', socket_chat, ['json']);
};

function view_app() {
    var self = this;
    self.view('app');
}

function socket_chat() {

	var self = this;

	// refresh online users
	var refresh = function() {
		var users = [];

		self.all(function(client) {
			if (client.alias)
				users.push(client.alias);
		});

		self.send({ type: 'users', message: users });
	};

	self.on('message', function(client, message) {

		if (message.type === 'change') {
			client.alias = message.message;
			refresh();
			return;
		}

		self.send({ user: client.alias, type: 'message', message: message.message, date: new Date() }, function(current) {
			return (current.alias || '').length > 0;
		});

	});

	self.on('close', function(client) {
		refresh();
	});

}