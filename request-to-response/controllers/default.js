exports.install = function(framework) {
	framework.route('/', pipe_homepage);
	framework.route('/file/', pipe_file);
}

function pipe_homepage() {
	var self = this;
	self.pipe('https://www.totaljs.com');
}

function pipe_file() {
	var self = this;
	self.pipe('https://www.totaljs.com/download/logo-black.png');
}