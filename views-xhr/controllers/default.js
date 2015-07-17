exports.install = function() {
	F.route('/', view_homepage);
	F.route('/xhr/', xhr_panel, ['xhr', 'post']);
};

function view_homepage() {
	var self = this;
	self.view('company');
}

function xhr_panel() {
	var self = this;
	self.view(self.body.choice);
}