exports.install = function(framework) {
	framework.route('/', viewHomepage);
};

function viewHomepage() {
	var self = this;

	self.place('scripts', '<script>alert("FROM CONTROLLER");</script>');
	self.view('homepage');

}
