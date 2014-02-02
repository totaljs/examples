var fs = require('fs');

exports.install = function(framework) {
	framework.route('/', view_homepage);
};

function view_homepage() {

	var self = this;

	// Harmony usage
	// async(fn)([callback])
	// utils.async(fn)([callback]);

	// Prepare function to async
	// sync(fn)
	// utils.sync(fn);

	async(function *() {

		var a = yield sync(fs.readFile)(self.path.root('index.js'));
		var b = yield sync(fs.readFile)(self.path.root('controllers/default.js'));

		self.plain('==== index.js\n\n' + a.toString('utf8') + '\n\n==== controllers/default.js\n\n' + b.toString('utf8'));

	})();

}