var passport = require('passport');

exports.install = function() {
	F.route('/', view_homepage);
	F.route('/passport/', passport_login_bearear_callback, ['#passport.js']);
};

function view_homepage() {
	var self = this;
	self.view('homepage');
}

function passport_login_bearear_callback() {
	var self = this;
	passport.authenticate('bearer', { session: false })(self.req, self.res, function(err) {

		// if err = passport answers automatically
		if (err)
			return;

		self.json(self.user);
	});
}