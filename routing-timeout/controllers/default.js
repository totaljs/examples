exports.install = function() {
	ROUTE('GET /',       timeout);
	ROUTE('GET /quick/', timeout,  [100]);      // timeout 100 milliseconds
	ROUTE('GET /delay/', delay,    ['delay']);  // https://docs.totaljs.com/latest/en.html#api~HttpRouteOptionsFlags~delay

	// Request timeout (define timeout page)
	// ROUTE('#408', view_408);
};

function timeout() {
	// I forgot to call the view
}

// function view_408() {
// 	this.plain('TIMEOUT');
// }

function delay() {
	var self = this;
	setTimeout(function() {
		self.plain('10 seconds delay');
	}, 10000);
}