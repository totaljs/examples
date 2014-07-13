exports.install = function(framework) {
	framework.route('/', view_homepage);
};

function view_homepage() {
	var self = this;
	process.send('Response framework ID: ' + framework.id);
	self.view('homepage');
}