NEWSCHEMA('Customers', function (schema) {

	schema.action('query', {
		name: 'Query',
		action: function ($) {
			$.callback([]);
		}
	});

	schema.action('read', {
		name: 'Read',
		action: function ($) {
			$.invalid('somet-error');
		}
	});

});