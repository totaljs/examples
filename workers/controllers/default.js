exports.install = function() {
	ROUTE('GET /', view_index);
};

function view_index() {
	var self = this;
	self.json(MAIN.xml);
}