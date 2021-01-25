exports.install = function() {

	ROUTE('GET /customers/         *Customers --> query');
	ROUTE('GET /customers/{id}/    *Customers --> read');

	// Testing route
	ROUTE('GET /test/', test);

};

// Action which performs unit-testing
function test() {

	// this === Total.js Controller
	var self = this;

	self.runtest('GET /customers/', 'Customers-->@query');
	self.runtest('GET /customers/123/', 'Customers-->@read'); // Invalid Id
}
