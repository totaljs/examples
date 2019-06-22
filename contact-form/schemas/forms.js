NEWSCHEMA('ContactForms', function(schema) {

	schema.define('email', 'Email', true);
	schema.define('phone', 'Phone');
	schema.define('message', 'string(10000)', true);

	schema.setSave(function($) {

		var model = $.model;

		// Extends model
		model.dtcreated = NOW;
		model.ip = $.ip;
		model.ua = ($.headers['user-agent'] || '').parseUA();

		NOSQL('contactforms').insert(model);
		$.success();
	});
});