NEWSCHEMA('Contact').make(function(schema) {

	schema.define('firstname', 'Capitalize(30)', true);
	schema.define('lastname', 'Capitalize(30)', true);
	schema.define('email', 'Email', true);
	schema.define('age', 'Number', true);
	schema.define('terms', 'Boolean', true);

	schema.setPrefix('error-');

	schema.setValidate(function(name, value) {
		switch (name) {
			case 'age':
				return value < 17 ? 'You are too young.' : value > 40 ? 'You are too old' : true;
		}
	});

	schema.setSave(function(error, model, options, callback) {
		callback(SUCCESS(true));
	});

});