exports.install = function() {
	framework.route('/', authorization);
};

function authorization() {

	var self = this;
	var auth = self.baa();

	if (auth.empty) {
		self.baa('This is secured area');
		// It sends the response automatically.
		return;
	}

	if (auth.user !== 'peter' || auth.password !== '123456') {
		self.view401();
		return;
	}

	self.plain('You are authorized.');
}