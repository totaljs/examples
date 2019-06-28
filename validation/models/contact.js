NEWSCHEMA('Contacts', function(schema) {

	schema.define('firstname', 'Capitalize(30)', true);
	schema.define('lastname', 'Capitalize(30)', true);
	schema.define('email', 'Email', true);
	schema.define('age', Number, age => age < 18 ? 'You are too young.' : age > 40 ? 'You are too old' : true);
	schema.define('terms', Boolean, true);

	// Sets prefix into the resource file
	schema.setPrefix('error-');

	schema.setSave(function($) {
		var data = $.clean();
		console.log('NEW CONTACT FORM:', data);
		$.success();
	});

});