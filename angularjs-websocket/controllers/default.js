exports.install = function() {
	F.route('/*', view_app);
	F.websocket('/', socket_chat, ['json']);
};

function view_app() {
	var self = this;
	self.view('app');
}

function socket_chat() {

	var self = this;

	// Refreshes online users
	var refresh = function() {
		var users = [];
		self.all(client => users.push(client.alias));
		self.send({ type: 'users', message: users });
	};

	self.on('message', function(client, message) {

		if (message.type === 'change') {
			client.alias = message.message;
			refresh();
			return;
		}

		self.send({ user: client.alias, type: 'message', message: message.message, date: new Date() });

	});

	self.on('close', (client) => refresh());
}