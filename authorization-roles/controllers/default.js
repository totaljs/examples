exports.install = function() {
	ROUTE('GET /');
	ROUTE('GET /',        view_administrator, ['authorize', '@administrator']);
	ROUTE('GET /',        view_moderator,     ['authorize', '@moderator']);
	ROUTE('GET /both/',   view_both,          ['authorize', '@moderator', '@administrator']);

	// Login/Logout
	ROUTE('GET /login/',  redirect_login,     ['unauthorize']);
	ROUTE('GET /logout/', redirect_logout);
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
			self.cookie('__user', self.query.user, '1 day');
			self.redirect('/');
			break;
		default:
			self.throw401();
			return;
	}
}

function redirect_logout() {
	var self = this;
	self.cookie('__user', '', '-1 day');
	self.redirect('/');
}