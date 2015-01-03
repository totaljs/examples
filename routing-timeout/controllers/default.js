exports.install = function() {
	framework.route('/', timeout);
	framework.route('/quick/', timeout, { timeout: 100 });
	
	// Request timeout (define timeout page)
	framework.route('#408', view_408);
}

function timeout() {
	// I forgot to call the view
}

function view_408() {
	this.plain('TIMEOUT');
}