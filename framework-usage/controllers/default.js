exports.install = function(framework) {
	framework.route('/', viewHomepage);
};

exports.usage = function() {
	return 'controller usage';
};

function viewHomepage() {
	var self = this;

	// self.framework.usage([detailed:bool default false])
	self.json(self.framework.usage(true), true);
}