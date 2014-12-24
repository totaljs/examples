exports.install = function(framework) {
	framework.route('/', view_index);
};

// Read all users
function view_index() {
	var self = this;
	var User = MODEL('user');
	User.find(function(err, users) {
		self.view('index', users);
	});
}