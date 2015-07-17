exports.install = function() {
	F.route('/');

	F.route('/', view_administrator, ['authorize', '@administrator']);
	F.route('/', view_moderator, ['authorize', '@moderator']);
	F.route('/both/', view_both, ['authorize', '@moderator', '@administrator']);

	F.route('/login/', redirect_login, ['unauthorize']);
	F.route('/logoff/', redirect_logoff);
};

function view_both() {
	var self = this;
	self.plain('For both (moderator and administrator), current: ' + self.user.name);
}

function view_administrator() {
	var self = this;
	self.view('administrator');
}

function view_moderator() {
	var self = this;
	self.view('moderator');
}

function redirect_login() {
	var self = this;
	switch (self.query.user) {
		case 'administrator':
		case 'moderator':
			self.res.cookie('__user', self.query.user, '1 day');
			self.redirect('/');
			break;
		default:
			self.throw401();
			return;
	}
}

function redirect_logoff() {
	var self = this;
	self.res.cookie('__user', '', new Date().add('d', -1));
	self.redirect('/');
}