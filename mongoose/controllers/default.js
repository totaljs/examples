exports.install = function(framework) {
	framework.route('/', view_index);
};

// Read all users
function view_index() {
	var self = this;
<<<<<<< HEAD
	var User = MODEL('user').schema;

=======
	var User = MODEL('user');
>>>>>>> origin/v1.7.0
	User.find(function(err, users) {
		self.view('index', users);
	});
<<<<<<< HEAD

}

// Add a new user
function json_homepage() {

	var self = this;
	var User = MODEL('user').schema;
	var model = self.body;

	var user = new User({ alias: model.alias, created: new Date() }).save(function(err) {

		if (err)
			self.throw500(err);

		// Read all users
		User.find(self.callback());
	});

=======
>>>>>>> origin/v1.7.0
}