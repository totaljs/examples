NEWSCHEMA('ContactForm').make(function(schema) {
	schema.define('Email', 'Email', true);
	schema.define('Phone', 'Phone');
	schema.define('Message', 'string(10000)', true);
	schema.define('Ip', 'string(60)');
	schema.define('Created', Date);

	schema.setDefault(function(name) {
		switch (name) {
			case 'Email':
				return '@';
			case 'Phone':
				return '+421';
			case 'Created':
				return new Date();
		}
	});

	schema.setSave(function(error, model, options, callback) {
		NOSQL('contactform').insert(model);
		callback(SUCCESS(true));
	});
})