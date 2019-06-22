exports.install = function() {
	ROUTE('GET /', auth);
};

function auth() {

	var self = this;
	var auth = self.baa();

	// "baa" means "B"asic "A"ccess "A"uthentication

	if (auth.empty) {
		self.baa('This is secured area');
		// It sends the response automatically.
		return;
	}

	if (auth.user !== 'totaljs' || auth.password !== '123456') {
		self.baa('Wrong credentials, this is secured area:');
		// or self.view401();
		return;
	}

	self.plain('You are authorized.');
}