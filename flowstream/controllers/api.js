const Fs = require('fs');

exports.install = function() {

	// Flow
	ROUTE('+GET     /api/flow/components/', flow_components);
	ROUTE('+POST    /api/flow/', flow_save);
	ROUTE('+GET     /api/flow/', flow_read);

	// Dashboard
	ROUTE('+GET     /api/dashboard/components/', dashboard_components);
	ROUTE('+GET     /api/dashboard/flow/', dashboard_flow);
	ROUTE('+POST    /api/dashboard/', dashboard_save);
	ROUTE('+GET     /api/dashboard/', dashboard_read);

	// Socket
	ROUTE('+SOCKET  /', socket, ['json']);

	// Static files
	FILE('/dashboard/*.html', dashboard_component);
};

function notify(msg) {
	var arr = FLOW.instance.instances();
	arr.wait(function(com, next) {
		com[msg.TYPE] && com[msg.TYPE](msg);
		setImmediate(next);
	}, 3);
}

function socket() {

	var self = this;
	var timeout;

	MAIN.ws = self;

	self.autodestroy(() => MAIN.ws = null);

	var refreshstatus = function() {

		timeout = null;
		var arr = FLOW.instance.instances();

		// Sends last statuses
		arr.wait(function(com, next) {
			com.status();
			setImmediate(next);
		}, 3);

	};

	self.on('open', function() {
		timeout && clearTimeout(timeout);
		timeout = setTimeout(refreshstatus, 1500);
	});

	self.on('message', function(client, message) {
		switch (message.TYPE) {
			case 'dashboard':
			case 'status':
			case 'trigger':
				notify(message);
				break;
		}
	});

}

function flow_components() {
	var self = this;
	self.json(FLOW.instance.components(true));
}

function flow_save() {
	var self = this;
	FLOW.save(self.req.bodydata);
	FLOW.instance.use(self.body);
	self.success();
}

function flow_read() {
	var self = this;
	FLOW.json(self);
}

function dashboard_components() {
	var self = this;
	Fs.readdir(PATH.databases('dashboard'), function(err, response) {

		var output = [];
		for (var i = 0; i < response.length; i++) {
			var item = response[i];
			if ((/\.html$/).test(item))
				output.push(item);
		}

		self.json(output);
	});
}

function dashboard_flow() {
	var self = this;
	self.json(FLOW.dashboard());
}

function dashboard_save() {
	var self = this;

	Fs.writeFile(PATH.databases('dashboard.json'), self.req.bodydata, ERROR('dashboard_save'));
	self.success();
}

function dashboard_read() {
	var self = this;
	Fs.readFile(PATH.databases('dashboard.json'), function(err, response) {
		if (response)
			self.binary(response, 'application/json');
		else
			self.json([]);
	});
}

function dashboard_component(req, res) {
	res.file(PATH.databases('dashboard/' + req.split[1]));
}