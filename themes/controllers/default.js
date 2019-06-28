exports.install = function() {
	ROUTE('GET /', view_index);
};

function view_index() {
	var self = this;
	self.theme(self.query.theme || 'green');
	self.title('Theme example');
	self.view('index');
}