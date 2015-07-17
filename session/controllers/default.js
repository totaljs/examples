exports.install = function() {

	F.route('/', view_index, ['#session']);

	// Or set a global middleware
	// F.use('session');
};

function view_index() {
	var self = this;

	if (typeof(self.session.counter) === 'undefined')
		self.session.counter = 0;
	self.session.counter++;

	self.view('index');
}