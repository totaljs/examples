var fs = require('fs');

exports.install = function() {
	F.route('/', view_homepage);
};

// EXAMPLE:
// A function with a callback
function custom(a, b, callback) {
	// callback(error, result);
	callback(null, a + b);
};

function *view_homepage() {

	var self = this;

	// Harmony usage
	// async(fn)([callback])
	// utils.async(fn)([callback]);

	// Prepare function to async
	// sync(fn, [owner/context])
	// utils.sync(fn, [owner/context]);

	var a = yield sync(fs.readFile)(self.path.root('index.js'));
	var b = yield sync(fs.readFile)(self.path.root('controllers/default.js'));

	// Example MySQL connection:
	// var c = yield sync(connection.query, connection)('SELECT * FROM USER LIMIT 0, 10');

	// custom function
	var c = yield sync(custom)(1, 2);

	self.plain('==== index.js\n\n' + a.toString('utf8') + '\n\n==== controllers/default.js\n\n' + b.toString('utf8') + '\n\n==== custom function\n\n' + c);

	// async(*, [callback/controller])
	// if the async throws an error then controller executes view500(error)

}