NEWSCHEMA('Contacts', function(schema) {

	schema.define('firstname', 'Name(30)', true);
	schema.define('lastname', 'Name(30)', true);
	schema.define('email', 'Email', true);
	schema.define('age', Number, age => age < 18 ? 'You are too young.' : age > 40 ? 'You are too old' : true);
	schema.define('terms', Boolean, true);

	schema.action('save', {
		name: 'Save contact',
		action: function($, model) {
			model.id = UID();
			model.dtcreated = NOW;
			delete model.terms;
			NOSQL('contacts').insert(model).callback($.done());
		}
	});
});