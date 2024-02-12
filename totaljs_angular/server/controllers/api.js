exports.install = function() {
	// Enable CORS
	// CORS('/api/*', ['http://localhost:4200']);


	// API endpoints
	ROUTE('GET      /api/employees/                               *Employees --> list');
	ROUTE('POST     /api/employees/create/                        *Employees --> create');
	ROUTE('GET      /api/employees/read/{id}/                     *Employees --> read');
	ROUTE('PUT      /api/employees/update/{id}/                   *Employees --> update');
	ROUTE('DELETE   /api/employees/remove/{id}/                   *Employees --> remove');
}