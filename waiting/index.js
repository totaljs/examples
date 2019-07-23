require('total.js').http('debug');

ROUTE('GET /', function() {
	this.plain('Welcome');
});

PAUSESERVER('database');
PAUSESERVER('users');
PAUSESERVER('system');

setTimeout(function() {
	PAUSESERVER('database');
}, 3000);

setTimeout(function() {
	PAUSESERVER('users');
}, 5000);

setTimeout(function() {
	PAUSESERVER('system');
}, 7000);

// Open browser with http://127.0.0.1:8000/ and refresh repeatly.