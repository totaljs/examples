exports.install = function(framework) {
	framework.route('/', json_usage);
};

exports.usage = function() {
	return 'controller usage';
};

function json_usage() {
	var self = this;
	// self.framework.usage([detailed:bool default false])
	self.json(framework.usage(true), true);
}