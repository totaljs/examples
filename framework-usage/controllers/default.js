exports.install = function() {
	F.route('/', json_usage);
};

exports.usage = function() {
	return 'controller usage';
};

function json_usage() {
	var self = this;
	// F.usage([detailed:bool default false])
	self.json(F.usage(true), true);
}