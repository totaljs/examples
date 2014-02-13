exports.install = function(framework) {
	framework.route('/', view_homepage);
	framework.route('/controller/', view_homepage_controller);
	framework.route('/custom/', view_custom);
	framework.route('/controller/custom/', view_custom_controller);
};

function view_homepage() {
	var self = this;
	self.view('homepage');
}

function view_custom() {
	var self = this;
	self.view('custom');
}

function view_homepage_controller() {
	var self = this;

	self.meta('title controller', 'description controller', 'keywords controller');

	// self.meta('title controller', 'description controller', 'keywords', 'meta image_src');

	// ===========================================================================
	// look at example: framework-custom
	// ===========================================================================

	self.view('homepage-controller');
}

function view_custom_controller() {
	var self = this;
	self.title('title controller');
	self.description('description controller');
	self.keywords('keywords controller');
	self.view('custom-controller');
}