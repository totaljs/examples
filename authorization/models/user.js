NEWSCHEMA('User').make(function(schema) {

	schema.define('email', 'Email', true);
	schema.define('password', 'String(30)', true);

	schema.addWorkflow('login', function(error, model, controller, callback) {

		NOSQL('users').find().make(function(builder) {
			builder.first();
			builder.where('email', model.email);
			builder.where('password', model.password);
			builder.callback(function(err, response) {

				if (!response) {
					error.push('error-user-404');
					return callback();
				}

				// Writes logs
				NOSQL('users-logs').insert({ id: response.id, email: response.email, ip: controller.ip, date: new Date() });

				// Sets cookies
				controller.cookie(F.config.cookie, F.encrypt({ id: response.id, ip: controller.ip }, 'user'), '5 minutes');

				// Responds
				callback(SUCCESS(true));

			}, error);
		});
	});

});