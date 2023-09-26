NEWSCHEMA('Products', function(schema) {

	schema.action('query', {
		name: 'Query products list',
		action: function($) {
			// FUNC.TESTDB is defined in /definitions/db.js
			$.callback(FUNC.randomdata('products'));
		}
	});

});