exports.install = function() {
	F.route('/', view_index);
};

function view_index() {
	var self = this;
	self.theme(self.query.theme || 'green');
	self.title('Theme example');
	self.view('index');
}