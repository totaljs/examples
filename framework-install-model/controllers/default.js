exports.install = function() {
	F.route('/', plain_index);
};

function plain_index() {
	var self = this;
	self.plain(MODEL('user').user());
}