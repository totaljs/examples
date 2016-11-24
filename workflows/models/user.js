NEWSCHEMA('User').make(function(schema) {

	schema.define('name', 'String(30)');
	schema.define('email', 'Email');

	schema.addWorkflow('check', function(error, model, options, callback, controller) {
		console.log('User.workflow("check")');
		callback(SUCCESS(true));
	});

	schema.addWorkflow('confirm', function(error, model, options, callback, controller) {
		console.log('User.workflow("confirm")');
		callback(SUCCESS(true));
	});

	schema.addTransform('xml', function(error, model, options, callback, controller) {
		console.log('User.transform("xml")');
		callback(SUCCESS(true));
	});

	schema.addOperation('blabla', function(error, model, options, callback, controller) {
		console.log('User.operation("blabla")');
		callback(SUCCESS(true));
	});

	schema.setSave(function(error, model, options, callback, controller) {
		console.log('User.save()');
		callback(SUCCESS(true));
	});

	schema.setQuery(function(error, options, callback, controller) {
		console.log('User.query()');
		callback(SUCCESS(true));
	});

});