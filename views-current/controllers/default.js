exports.install = function() {
	F.route('/');
	F.route('/sub/', view_subpage);
};

function view_subpage() {

	var self = this;

	// set default image path (affects layout)
	self.currentImage('products');
	self.view('subpage');
};