NEWSCHEMA('Users', function(schema) {

	schema.define('name', 'Name', true);
	schema.define('email', 'Email', true);

	schema.setInsert(function($, model) {
		model.id = UID();
		model.dtcreated = NOW;
		NOSQL('users').insert(model).callback($.done(model.id));
	});

	schema.setList(function($, model) {
		NOSQL('users').find().callback($.callback);
	});

});