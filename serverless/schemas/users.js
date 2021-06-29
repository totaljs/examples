NEWSCHEMA('Users', function (schema) {

	schema.define('firstname', 'Name(30)', true);
	schema.define('lastname', 'Name(30)', true);
	schema.define('email', 'Email', true);
	schema.define('phone', 'Phone');

	schema.setQuery(function ($) {
		var builder = NOSQL('users').find();
		$.query.search && builder.search('search', $.query.search);
		builder.fields('id,firstname,lastname,dtcreated');
		builder.sort('dtcreated_desc');
		builder.callback($.callback);
	});

	schema.setRead(function ($) {

		// Reads the user
		NOSQL('users').one().error(404).where('id', $.id).callback($.callback);

	});

	schema.setInsert(function ($, model) {

		model.id = UID();
		model.dtcreated = NOW;
		model.search = (model.firstname + ' ' + model.lastname).toSearch();

		// Inserts data
		NOSQL('users').insert(model).callback($.done(model.id));

	});

	schema.setUpdate(function ($, model) {

		model.dtupdated = NOW;

		// Modifies data
		NOSQL('users').modify(model).where('id', $.id).callback($.done($.id));

	});

	schema.setRemove(function ($) {

		// Removes the user
		NOSQL('users').remove().where('id', $.id).callback($.done($.id));

	});
});