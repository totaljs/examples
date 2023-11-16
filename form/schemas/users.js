NEWSCHEMA('Users', function(schema) {

	schema.define('name', 'Name', true);
	schema.define('email', 'Email', true);

	schema.action('insert', {
		name: 'Insert new user',
		action: function($, model) {
			model.id = UID();
			model.dtcreated = NOW;
			NOSQL('users').insert(model).callback($.done(model.id));
		}
	});

	schema.action('list', {
		name: 'List users',
		action: function($) {
			NOSQL('users').find().callback($.callback);
		}
	});
});