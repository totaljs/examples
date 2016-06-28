exports.install = function() {
	F.route('/', view_logged, ['authorize']);
	F.route('/', view_homepage);
	F.route('/', json_login, ['post', '*User']);
	F.route('/logout/', logout, ['authorize']);
};

function view_logged() {
	var self = this;
	self.plain('You are logged as {0}. To unlogged remove cookie __user or click http://{1}:{2}/logout/'.format(self.user.email, F.ip, F.port));
}

function view_homepage() {
	var self = this;
	self.view('homepage', { email: '@' });
}

function json_login() {
	var self = this;
	self.body.$workflow('login', self, self.callback());
}

function logout() {
	var self = this;
	self.res.cookie(F.config.cookie, '', new Date().add('-1 year'));
	self.redirect('/');
}