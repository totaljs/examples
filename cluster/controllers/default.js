exports.install = function(framework) {
	framework.route('/', view_homepage);
};

function view_homepage() {
	var self = this;
	process.send('Response framework ID: ' + self.framework.id);
	self.view('homepage');
}