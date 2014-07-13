// Create model schemas

// [product] === array of schema('product')
// product = schema('product')
builders.schema('order', { products: '[product]', firstname: 'string(30)', lastname: 'string(40)', email: 'string(120)', telephone: 'string(20)', address: 'string', ip: 'string', created: Date, updated: Date }, function (name) {

	// Default values
	switch (name) {
		case 'created':
		case 'updated':
			return new Date();
		case 'email':
			return '@';
	}

});

// Create schema validation
// OR ... look into builders.schema('product') - alternative implementation
builders.validation('order', ['email', 'price', 'firstname', 'lastname', 'telephone', 'address', 'name'], function(name, value) {

	switch (name) {
		case 'email':
			return (value || '').isEmail();
		case 'price':
			return value.parseFloat() > 0;
		case 'firstname':
		case 'lastname':
		case 'telephone':
		case 'address':
		case 'name':
			return (value || '').length > 0;
	}

});

// builders.schema(name, definitions, [defaults], [validation])
builders.schema('product', { name: 'string(30)', price: 'number' }, null, function(name, value) {
	switch (name) {
		case 'name':
			return value.length > 0;
		case 'price':
			return value > 0;
	}
});

// builders.schema(name, definitions, [defaults], [validation])
builders.schema('contactform', { name: 'string(30)', email: 'string(120)', message: 'string(8000)', ip: 'string', created: Date }, function(name) {

	if (name === 'created')
		return new Date();

}, function(name, value) {
	switch (name) {
		case 'email':
			return (value || '').isEmail();
		case 'message':
		case 'name':
			return (value || '').length > 0;
	}
});

// Valid only this properties for 'contactform'
builders.validation('contactform', ['name', 'message', 'email']);