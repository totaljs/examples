exports.install = function() {
	F.route('/');
	F.route('/usage/', view_usage);

	F.websocket('/', socket_homepage, ['json']);

	// F.websocket('/chat/', socket_homepage, ['json'], ['chat']);
	// F.websocket('/chat/private/', socket_private_homepage, ['json'], ['privatechat'], ['*']);
	// F.websocket('/chat/private/sex/', socket_sex_homepage, ['json'], ['privatechat', 'sexchat'], ['www.totaljs.com', 'eshop.totaljs.com', 'blog.totaljs.com']);

	// On client side:
	// new WebSocket('ws://127.0.0.1:8004/', 'privatechat');
};

function view_usage() {
	var self = this;
	self.plain(F.usage(true));
}

function socket_homepage() {

	var controller = this;

    /*
    	Send message to all
    	@value {String or Object}
    	@names {String Array} :: client.id, optional - default null
    	@blacklist {String Array} :: client.id, optional - default null

		if (names === null || names === undefined)
			message send to all users

    */
    // controller.send(value, names, blacklist);

    /*
    	Close connection
    	@names {String Array} :: client.id, optional - default null

		if (names === null || names === undefined)
			close/disconnect all users

    */
    // controller.close(names);

	/*
    	Destroy websocket
    */
    // controller.destroy();

    /*
    	Get online count
    	return {Number}
    */
    // controller.online;

    /*
    	Find a client
    	@name {String}
    	return {Client}
    */
    // controller.find(name);

    // DESTROY CONTROLLER
    // controller.destroy();

    // ============================================================

    // client.id               : client identifiactor, you can modify this property, default contain random string
    // client.socket           : socket (internal)
    // client.req              : request
    // client.uri              : URI
    // client.ip               : IP
    // client.session          : empty object, you can modify this property
    // client.user             : empty object, you can modify this property
    // client.query            : get URL query parameters

    // client.cookie(name)	   : value
    // client.send(value)      : send message
    // client.close([message]) : disconnect client

	controller.on('open', function(client) {

		console.log('Connect / Online:', controller.online);

		client.send({ message: 'Hello {0}'.format(client.id) });
		controller.send({ message: 'Connect new user: {0}\nOnline: {1}'.format(client.id, controller.online) }, Object.keys(controller.connections), [client.id]);

        // or
        /*
        controller.send({ message: 'Some message' }, [], function(user) {
            // filter
            return user.id === client.id;
        });
        */

	});

	controller.on('close', function(client) {

		console.log('Disconnect / Online:', controller.online);
		controller.send({ message: 'Disconnect user: {0}\nOnline: {1}'.format(client.id, controller.online) });

	});

	controller.on('message', function(client, message) {

        console.log(message);

		if (typeof(message.username) !== 'undefined') {
			var old = client.id;
			client.id = message.username;
			controller.send({ message: 'rename: ' + old + ', new: ' + client.id });
			return;
		}

		// send to all without this client
		message.message = client.id + ': ' + message.message;
        console.log(message);
		controller.send(message);

	});

	// How many connections are opened?
	// controller.online;
}