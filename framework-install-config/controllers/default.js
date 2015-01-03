exports.install = function(framework) {
	framework.route('/', plan_index);
};

function plan_index() {
	var self = this;
	self.plain('name     : {0}\nversion  : {1}\nauthor   : {2}'.format(self.config.name, self.config.version, self.config.author));
}