exports.install = function() {
	F.route('/', view_homepage);
};

function view_homepage() {
	var self = this;
	console.log('Responded: ' + F.id);
	self.view('homepage');
}