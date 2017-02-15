exports.install = function() {

	F.route('/', view_index, ['#session']);

	// Or set a global middleware
	// F.use('session');
};

function view_index() {
	var self = this;

	if (self.session.counter)
		self.session.counter++;
	else
		self.session.counter = 1;

	self.view('index');
}