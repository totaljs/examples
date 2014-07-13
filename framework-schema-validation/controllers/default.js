exports.install = function(framework) {

	framework.route('/', plain_homepage);
	framework.route('/order/', post_order, ['post']);

};

function plain_homepage() {
	var self = this;

	// send test request to /order/
	utils.request(self.host('/order/'), ['post'], { firstname: 'Peter', lastname: 'Sirka', email: 'petersirka@gmail.com', telephone: '0903163302', address: '', inject1: '', inject2: '', param: 'custom' });

	self.plain('Show node.js console');
}

function post_order() {
	var self = this;

	// prepare request data into the model
	var model = Builders.prepare('order', self.post);
	var validation = Builders.validate('order', model);

	// or
	// var validation = self.validate('order', model);

	validation.resource('default', 'prefix_');

	console.log('Request data:\n', self.post);
	console.log('');

	if (validation.hasError()) {
		console.log('Validation:\n', validation.json());
		console.log('');
	}

	// I'm adding additional information
	model.ip = self.ip;

	//console.log('Model:\n', model);
	//console.log('');

	//console.log('Create a default schema - contactform:\n', builders.defaults('contactform'));
	//console.log('');

	self.empty();
}