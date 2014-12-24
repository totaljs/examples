exports.install = function(framework) {
	framework.route('/');
	framework.route('/new/', view_homepage2);
};

function view_homepage2() {
	var self = this;
	self.layout('layout_new');
	self.view('index');
}