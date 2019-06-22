exports.install = function() {
	ROUTE('GET /', plain_homepage);
};

function plain_homepage() {
	var self = this;
	self.plain('Total.js Platform on Heroku.');
}