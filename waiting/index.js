require('total.js').http('debug');

ROUTE('GET /', function() {
	this.plain('Welcome');
});

F.wait('database');
F.wait('users');
F.wait('system');

setTimeout(function() {
	F.wait('database');
}, 3000);

setTimeout(function() {
	F.wait('users');
}, 5000);

setTimeout(function() {
	F.wait('system');
}, 7000);

// Open browser with http://127.0.0.1:8000/ and refresh repeatly.