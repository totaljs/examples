exports.install = function(framework) {
	framework.route('/', view_registration);
	framework.route('/', json_registration, ['post']);
};

function codelist(controller) {
	controller.repository.country = ['', 'SK', 'CZ', 'EN', 'DE', 'AU', 'HU', 'PL', 'FR'];
	controller.repository.type = [
		{ id: 0, name: '' },
		{ id: 1, name: 'Developer' },
		{ id: 2, name: 'Webdesigner' },
		{ id: 3, name: 'Copywriter' },
		{ id: 4, name: 'Consultant' }
	];
}

function view_registration() {
	var self = this;

	var model = {
		type: 0,
		name: '',
		email: '@',
		password: '',
		phone: '+421',
		country: 'SK',
		terms: true
	};

	codelist(self);
	self.view('registration', model);
}

// THIS IS BAD EXAMPLE (SEND FORM VIA XHR)
// METHOD: POST
function json_registration() {
	var self = this;
	codelist(self);
	self.repository.isSuccess = true;
	self.view('registration', self.body);
}