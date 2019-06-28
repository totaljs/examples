exports.install = function() {
	ROUTE('GET /', view_index);
};

function view_index() {
	var self = this;
	self.place('scripts', '<script>alert("FROM CONTROLLER");</script>');
	self.view('index');
}
