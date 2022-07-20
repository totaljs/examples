exports.install = function() {
	ROUTE('GET    /api/users/list/      *Users --> list');
	ROUTE('POST   /api/users/insert/    *Users --> insert');
};