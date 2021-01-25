NEWSCHEMA('Customers', function(schema) {

	schema.setQuery(function($) {
		$.callback([]);
	});

	schema.setRead(function($) {
		$.invalid('somet-error');
	});

});