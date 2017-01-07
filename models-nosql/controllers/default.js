exports.install = function() {
	F.route('/', json_query, ['*Products']);
};

function json_query() {
	var self = this;
	self.$query(self.query, self.callback());
}