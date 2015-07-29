exports.install = function() {
	F.route('/', plain_index);
	F.route('/usage/', plain_usage);
};

function plain_index() {
	var self = this;
	self.plain('Restrictions ...');
}

function plain_usage() {
	this.plain(F.usage());
}