exports.install = function() {
	ROUTE('GET  /',     view_homepage);
	ROUTE('POST /xhr/', xhr_panel, ['xhr']);
};

function view_homepage() {
	var self = this;
	self.view('company');
}

function xhr_panel() {
	var self = this;
	self.view(self.body.choice);
}