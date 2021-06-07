exports.install = function() {

	// Total.js API - https://docs.totaljs.com/total4/407ff001jy51c/#api-routing
	// ROUTE('API   /api/      -users_query          *Users --> query');
	// ROUTE('API   /api/      -users_read/id        *Users --> read');
	// ROUTE('API   /api/      +users_insert/id      *Users --> insert');
	// ROUTE('API   /api/      +users_update/id      *Users --> update');
	// ROUTE('API   /api/      -users_remove/id      *Users --> remove');

	// REST API
	ROUTE('GET       /api/users/           *Users --> query');
	ROUTE('GET       /api/users/{id}/      *Users --> read');
	ROUTE('POST      /api/users/           *Users --> insert');
	ROUTE('PUT       /api/users/{id}/      *Users --> update');
	ROUTE('DELETE    /api/users/{id}/      *Users --> remove');

}