exports.install = function() {
	ROUTE('GET /users/', view_users);
	ROUTE('GET /users/admin/', view_users_admin);
};

function view_users() {
	var self = this;
	self.title('Users');

	// this view is loaded by the controller name: /views/users/index.html
	self.view('index');
}

function view_users_admin() {
	var self = this;
	self.title('Admin');
	self.view('~admin');
}