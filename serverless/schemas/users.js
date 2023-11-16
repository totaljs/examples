NEWSCHEMA('Users', function (schema) {

	schema.define('firstname', 'Name(30)', true);
	schema.define('lastname', 'Name(30)', true);
	schema.define('email', 'Email', true);
	schema.define('phone', 'Phone');

	schema.setQuery(function ($) {
		
	});

	schema.action('query', {
		name: 'Query the list of Users',
		query: 'search:String',
		action: function($) {
			var builder = NOSQL('users').find();
			$.query.search && builder.search('search', $.query.search);
			builder.fields('id,firstname,lastname,dtcreated');
			builder.sort('dtcreated_desc');
			builder.callback($.callback);
		}
	});

	schema.action('read', {
		name: 'Read specific user info',
		params: '*id:UID',
		action: function($) {
			// Reads the user
			NOSQL('users').one().error(404).where('id', $.params.id).callback($.callback);
		}
	});


	schema.action('insert', {
		name: 'Insert new user',
		action: function($, model) {
			model.id = UID();
			model.dtcreated = NOW;
			model.search = (model.firstname + ' ' + model.lastname).toSearch();
	
			// Inserts data
			NOSQL('users').insert(model).callback($.done(model.id));
		}
	});

	schema.action('update', {
		name: 'Update user information',
		params: '*id:UID',
		action: function($, model) {
			model.dtupdated = NOW;

			// Modifies data
			NOSQL('users').modify(model).where('id', $.params.id).callback($.done($.params.id));
	
		}
	});

	schema.action('remove', {
		name: 'Remove a specific user',
		params: '*id:UID',
		action: function($) {
			// Removes the user
			NOSQL('users').remove().where('id', $.params.id).callback($.done($.params.id));
		}
	});
});