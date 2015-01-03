exports.install = function() {
	framework.route('/');
	framework.route('/sub/', view_subpage);
};

function view_subpage() {

	var self = this;

	// set default image path (affects layout)
	self.currentImage('products');
	self.view('subpage');	
};