exports.install = function(framework) {
	framework.route('/', view_homepage);
	framework.route('/', json_homepage, ['xhr', 'post']);
};

// Read all users
function view_homepage() {

	var self = this;
	var User = MODEL('user').schema;

	User.find(function(err, users) {
		self.view('homepage', users);
	});

}

// Add a new user
function json_homepage() {

	var self = this;
	var User = MODEL('user').schema;
	var model = self.body;

	var user = new User({ alias: model.alias, created: new Date() }).save(function(err) {

		if (err)
			return self.throw500(err);

		// Read all users
		User.find(function(err, users) {

			self.content(self.template('users', users), 'text/html');
		});

	});

}