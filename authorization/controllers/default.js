exports.install = function() {

	// Main routes
	ROUTE('GET  /', view_logged, ['authorize']);
	ROUTE('GET  /', view_unlogged);

	// Operations are defined in /schemas/users.js
	ROUTE('POST /login/        *Users --> @login',  ['unauthorize']);
	ROUTE('GET  /logout/       *Users --> @logout', ['authorize']);

};

function view_logged() {
	var self = this;
	self.plain('You are logged as {0}. To unlogged remove cookie __user or click http://{1}:{2}/logout/'.format(self.user.email, F.ip, F.port));
}

function view_unlogged() {
	var self = this;
	self.view('homepage', { email: '@' });
}