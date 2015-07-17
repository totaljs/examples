exports.install = function() {
	F.route('/', view_logged, ['authorize']);
	F.route('/', view_homepage);
	F.route('/', json_homepage, ['xhr', 'post']);
	F.route('/logout/', logout, ['authorize', 'get']);
};

function view_logged() {
	var self = this;
	self.plain('You are logged as {0}. To unlogged remove cookie __user or click http://{1}:{2}/logout/'.format(self.user.email, F.ip, F.port));
}

function view_homepage() {
	var self = this;
	self.view('homepage', { LoginName: '@' });
}

function json_homepage() {

	var self = this;
	var error = self.validate(self.post, ['LoginName', 'LoginPassword']);

	if (self.user !== null)
		error.add('Logged');

	if (error.hasError()) {
		self.json(error);
		return;
	}

	var db = self.database('users');
	db.one(n => n.email === self.body.LoginName && n.password === self.body.LoginPassword, function(err, user) {

		if (user === null) {
			error.add('LoginError');
			self.json(error);
			return;
		}

		self.database('users-logs').insert({ id: user.id, email: user.email, ip: self.req.ip, date: new Date() });

		// Save to cookie
		self.res.cookie(F.config.cookie, F.encrypt({ id: user.id, ip: self.req.ip }, 'user'), new Date().add('5 minutes'));

		// Return result
		self.json({ r: true });
	});
}

function logout() {
	var self = this;
	self.res.cookie(F.config.cookie, '', new Date().add('-1 year'));
	self.redirect('/');
}