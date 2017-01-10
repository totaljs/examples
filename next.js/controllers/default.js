exports.install = function() {
	F.route('/a', view_a);
	F.route('/b', view_b);
};

function view_a() {
	var self = this;
	self.next('a', self.query);
}

function view_b() {
	var self = this;
	self.next('b', self.query);
}