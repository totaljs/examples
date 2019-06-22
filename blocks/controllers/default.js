exports.install = function() {
	ROUTE('GET /');
	ROUTE('GET /admin/', 'index');
};