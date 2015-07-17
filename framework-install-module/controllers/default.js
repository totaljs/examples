exports.install = function() {
	F.route('/', plain_homepage);
};

function plain_homepage() {
	var self = this;
	self.plain(self.module('Test').hello());
}