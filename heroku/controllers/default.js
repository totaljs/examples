exports.install = function() {
	F.route('/', plain_homepage);
};

function plain_homepage() {
	var self = this;
	self.plain('total.js on Heroku.');
}