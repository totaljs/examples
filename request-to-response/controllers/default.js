exports.install = function() {
	ROUTE('/', pipe_homepage);
	ROUTE('/file/', pipe_file);
};

function pipe_homepage() {
	var self = this;
	self.proxy('https://www.totaljs.com');
}

function pipe_file() {
	var self = this;
	self.proxy('https://www.totaljs.com/img/logo.png');
}