exports.install = function() {
	ROUTE('GET /', view_index);
};

function view_index() {
	var self = this;
	self.plain(require('url').format(self.uri));
}