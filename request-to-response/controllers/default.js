exports.install = function() {
	F.route('/', pipe_homepage);
	F.route('/file/', pipe_file);
};

function pipe_homepage() {
	var self = this;
	self.pipe('https://www.totaljs.com');
}

function pipe_file() {
	var self = this;
	self.pipe('https://www.totaljs.com/img/logo.png');
}