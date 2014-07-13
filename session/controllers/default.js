exports.install = function(framework) {

	framework.route('/', view_homepage, ['#session']);

	// Or set a global middleware
	// framework.use('session');
};

function view_homepage() {
	var self = this;

	if (typeof(self.session.counter) === 'undefined')
		self.session.counter = 0;
	self.session.counter++;

	self.view('homepage');
}