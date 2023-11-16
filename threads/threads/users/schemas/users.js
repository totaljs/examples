NEWSCHEMA('Users', function(schema) {

	schema.action('query', {
		name: 'Query users list',
		action: function($) {
			// FUNC.TESTDB is defined in /definitions/db.js
			$.callback(FUNC.randomdata('users'));
		}
	});
});