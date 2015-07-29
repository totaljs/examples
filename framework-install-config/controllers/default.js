exports.install = function() {
	F.route('/', plan_index);
};

function plan_index() {
	var self = this;
	self.plain('name     : {0}\nversion  : {1}\nauthor   : {2}'.format(F.config.name, F.config.version, F.config.author));
}