exports.install = function() {
	ROUTE('GET /');
	ROUTE('GET /new/', view_homepage2);
};

function view_homepage2() {
	var self = this;
	self.layout('layout_new');
	self.view('index');
}