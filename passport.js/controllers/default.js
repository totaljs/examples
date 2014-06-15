var passport = require('passport');

exports.install = function(framework) {
	framework.route('/', view_homepage);
	framework.route('/login/twitter/', passport_login_twitter, { middleware: ['passport.js'] });
	framework.route('/login/twitter/callback/', passport_login_twitter_callback, { middleware: ['passport.js'] });
};

function view_homepage() {
	var self = this;
	self.view('homepage');
}

// Twitter sign in
function passport_login_twitter() {
	var self = this;
	self.custom();
	passport.authenticate('twitter')(self.req, self.res);
}

// Twitter profile
function passport_login_twitter_callback() {
	var self = this;
	passport.authenticate('twitter')(self.req, self.res, function(err) {
		if (err)
			return self.redirect('/login/twitter/');
		self.json(self.user);
	});

}