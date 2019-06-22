exports.install = function() {
	ROUTE('GET /', cors_time);

	// Enables CORS for all requests
	CORS();
};

function cors_time() {
	this.plain(new Date().toString());
}