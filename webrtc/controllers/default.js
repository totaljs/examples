exports.install = function(framework) {
	framework.route('/', view_homepage);
	framework.websocket('/', socket_synchronize, ['json']);
};

function socket_synchronize() {
	var self = this;

	self.on('open', function(client) {

		client.pair = null;
		
		self.all(function(user) {

			if (user.id === client.id)
				return;

			// Find pair of users (by the room)
			// user.get.room === ?room=ABCDEFG
			if (user.get.room === client.get.room) {
				user.pair = client;
				client.pair = user;
			}

		});

		if (client.pair === null)
			return;

		client.send({ eventName: 'new_peer_connected', data: { socketId: client.get.room }});
		client.pair.send({ eventName: 'new_peer_connected', data: { socketId: client.get.room }});
	});

	self.on('close', function(client) {

	});

	self.on('message', function(client, message) {
		if (client.pair === null)
			return;
		
		client.pair.send({ eventName: 'receive_offer', data: { sdp: message.sdp, socketId: client.get.room }});
	});

}

function view_homepage() {
	var self = this;
	self.view('homepage');
}