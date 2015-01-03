exports.install = function(framework) {
	framework.route('/', view_index);
};

function view_index() {

	var self = this;

	// call a module
	var now = self.module('utils').now();

    // or

    var greeting = MODULE('feedback').greeting('Thanks');

	self.plain('From module utils -> {0} ({1})'.format(now, greeting));
}