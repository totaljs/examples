NEWSCHEMA('Users', function(schema) {

	schema.define('email', 'Email', true);
	schema.define('password', 'String(30)', true);

	
	schema.action('login', {
		name: 'Performs login',
		action: function($, model) {

			var builder = NOSQL('users').one();
			builder.where('email', model.email);
			builder.where('password', model.password);
			builder.callback(function(err, user) {
	
				if (!user) {
					$.invalid('error-users-404');
					return;
				}
	
				// Creates a cookie and session item
				MAIN.session.authcookie($, UID(), user.id, '3 days');
	
				// Writes audit
				$.audit(user.id + ': ' + user.name);
				$.success();
			});
		}
	});

	schema.action('logout', {
		name: 'Performs logout',
		action: function($) {
			// Removes session
			MAIN.session.logout($);

			// Performs a redirect
			$.redirect('/');

		}
	});
});