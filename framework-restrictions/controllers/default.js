exports.install = function(framework) {
	framework.route('/', plain_index);
	framework.route('/usage/', plain_usage);
};

function plain_index() {
	var self = this;
	self.plain('Restrictions ...');
}

function plain_usage() {
	this.plain(framework.usage());
}