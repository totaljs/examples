exports.install = function() {
	F.route('/', view_homepage);
	F.route('/', view_homepage, ['xhr', 'post']);
};

function view_homepage() {
	var self = this;

	if (!self.xhr) {
		self.view('index', { LoginName: '@' });
		return;
	}

	var error = new ErrorBuilder(n => F.resource('en', n));

	if (U.validate(self.body, ['FirstName', 'LastName', 'Age', 'Email', 'Terms'], onValidation, error).hasError()) {
		self.json(error);
		return;
	}

	self.json({ r: true });
}

function onValidation(name, value) {
	switch (name) {
		case 'Email':
			return U.isEmail(value);
		case 'Age':
			return U.parseInt(value) > 0 ? true : 'Fill fucking age';
		case 'Terms':
			return value === '1';
		case 'FirstName':
		case 'LastName':
			return value.length > 0;
	};
}