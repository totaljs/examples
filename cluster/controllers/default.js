exports.install = function() {
	F.route('/', view_homepage);
};

function view_homepage() {
	var self = this;
	process.send('Response framework ID: ' + F.id);
	self.view('homepage');
}