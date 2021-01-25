exports.install = function() {
	ROUTE('GET /', pipe_homepage);
	ROUTE('GET /file/', pipe_file);
};

function pipe_homepage() {
	var self = this;
	self.proxy('https://www.totaljs.com');
}

function pipe_file() {
	var self = this;
	self.proxy('https://www.totaljs.com/img/logo.png');
}