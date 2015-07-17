exports.install = function() {
	F.route('/', plain_homepage);
	F.route('/order/', plain_order, ['post']);
};

function plain_homepage() {
	var self = this;

	// send "test" request to /order/
	utils.request(self.host('/order/'), ['post'], { firstname: 'Peter', lastname: 'Sirka', email: 'petersirka@gmail.com', telephone: '0903163302', address: '', inject1: '', inject2: '', param: 'custom' });
	self.plain('Show node.js console');
}

function plain_order() {

	var self = this;
	var group = SCHEMA('eshop');

	var order_schema = group.get('order');
	var contactform_schema = group.get('contactform');

	// validate request data
	var validation = order_schema.validate(self.body, 'prefix_');

	// prepare request data into the model
	var model = order_schema.prepare(self.body);

	console.log('Request data:\n', self.body);
	console.log('');

	if (validation.hasError()) {
		console.log('Validation:\n', validation.json());
		console.log('');
	}

	// I'm adding additional information
	model.ip = self.ip;

	console.log('Model:\n', model);
	console.log('');

	console.log('Create a default schema - contactform:\n', contactform_schema.create());
	console.log('');

	self.plain();
}