var passport = require('passport');

exports.install = function() {
	F.route('/', view_index);
	F.route('/login/twitter/', passport_login_twitter, ['#session', '#passport.js']);
	F.route('/login/twitter/callback/', passport_login_twitter_callback, ['#session', '#passport.js']);
};

function view_index() {
	var self = this;
	self.view('index');
}

// Twitter sign in
function passport_login_twitter() {
	var self = this;

	// Why self.custom()?
	// Because passport module has own mechanism for redirects into the Twitter.
	self.custom();

	passport.authenticate('twitter')(self.req, self.res);

}

// Twitter profile
function passport_login_twitter_callback() {
	var self = this;
	passport.authenticate('twitter')(self.req, self.res, function(err) {
		if (err)
			return self.redirect('/login/twitter/');

		// self.json(self.user);
		self.json({ name: self.user.displayName });
	});

}