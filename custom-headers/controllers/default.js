exports.install = function() {
	F.route('/', view_homepage);
};

function view_homepage() {
	var self = this;

	// look to homepage.html

	self.header('X-XSS-Protection', '1; mode=block');
	self.view('homepage');
}