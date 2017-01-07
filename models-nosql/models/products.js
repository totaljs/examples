NEWSCHEMA('Products').make(function(schema) {
	schema.setQuery(function(error, options, callback, controller) {
		NOSQL('products').find().make(function(builder) {
			// builder.take(U.parseInt(options.take) || 20);
			// builder.skip(U.parseInt(options.skip) || 0);
			builder.callback(callback);
		});
	});
});