exports.install = function() {
	F.route('/', view_homepage);
};

function view_homepage() {
	var self = this;

	// Appends <script type="text/javascript" src="test.js"></script> to head
	self.head('test.js');
	self.view('index');
}
