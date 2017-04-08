exports.install = function() {
	F.route('/', timeout);
	F.route('/quick/', timeout, [100]); // timeout 100 milliseconds
	F.route('/delay/', delay, ['delay']);

	// Request timeout (define timeout page)
	F.route('#408', view_408);
};

function timeout() {
	// I forgot to call the view
}

function view_408() {
	this.plain('TIMEOUT');
}

function delay() {
	var self = this;
	setTimeout(function() {
		self.plain('10 seconds delay');
	}, 10000);
}