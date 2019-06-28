exports.install = function() {
	ROUTE('GET /');
	ROUTE('GET /controller/', view_index_controller);
	ROUTE('GET /custom/');
	ROUTE('GET /controller/custom/', view_custom_controller);
};

function view_index_controller() {
	var self = this;

	self.meta('title controller', 'description controller', 'keywords controller');
	// self.meta('title controller', 'description controller', 'keywords', 'meta image_src');

	// ===========================================================================
	// look into the example: framework-custom
	// ===========================================================================

	self.view('index-controller');
}

function view_custom_controller() {
	var self = this;
	self.title('title controller');
	self.description('description controller');
	self.keywords('keywords controller');
	self.view('custom-controller');
}