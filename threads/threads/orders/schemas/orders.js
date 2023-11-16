NEWSCHEMA('Orders', function(schema) {


	schema.action('query', {
		name: 'Query orders list',
		action: function($) {
			$.callback(FUNC.randomdata('orders'));
		}
	});

});