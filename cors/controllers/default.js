exports.install = function() {
	F.route('/time/', cors_time, ['cors']);
	// is same as:
	// F.cors('/time/', ['GET'])
};

function cors_time() {
	var self = this;
	self.plain(new Date().toString());
}