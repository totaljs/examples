exports.install = function() {

	ROUTE('POST /users/', function() {
		this.json({ id: '123' });
	});

};