NEWSCHEMA('Users', function(schema) {

	schema.define('email', 'Email', true);
	schema.define('password', 'String(30)', true);

	// Performs login
	schema.addWorkflow('login', function($) {

		var builder = NOSQL('users').one();
		builder.where('email', $.model.email);
		builder.where('password', $.model.password);
		builder.callback(function(err, user) {

			if (!user) {
				$.invalid('error-users-404');
				return;
			}

			var opt = {};
			opt.name = CONF.cookie;        // A cookie name
			opt.key = CONF.cookie_secret;  // A cookie secret key
			opt.id = user.id;              // A user ID
			opt.expire = '3 days';         // Expiration
			opt.data = user;               // A session data
			opt.note = ($.headers['user-agent'] || '').parseUA() + ' ({0})'.format($.ip); // A custom note

			// Creates a cookie and session item
			MAIN.session.setcookie($, opt, $.done());

			// Writes audit
			AUDIT('users', $, 'login', user.id + ': ' + user.name);
		});
	});

	// Performs logout
	schema.addWorkflow('logout', function($) {

		console.log('SOM TU');

		// Removes session
		MAIN.session.remove($.sessionid);

		// Removes auth cookie
		$.cookie(CONF.cookie, '', '-1 year');

		// Performs a redirect
		$.redirect('/');
	});

});