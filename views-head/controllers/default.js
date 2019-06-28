exports.install = function() {
	ROUTE('GET /', view_homepage);
};

function view_homepage() {
	var self = this;

	// Appends <script src="test.js"></script> to head
	self.head('test.js');
	self.view('index');
}
