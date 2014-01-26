exports.install = function(framework) {
	framework.route('/', view_homepage);
};

function view_homepage() {

	var self = this;

	var db = {
		products: [],
		users: []
	};
	
	self.async.await(function(next) {
		self.proxy('http://127.0.0.1:8001', { age: 25 }, function(error, data) {

			if (error)
				self.error(error);

			db.users = data;
			next();
		});
	});

	self.async.await(function(next) {
		self.proxy('http://127.0.0.1:8002', {}, function(error, data) {			

			if (error)
				self.error(error);

			db.products = data;
			next();
		});
	});

	self.async.complete(function() {
		self.json(db);
	});
	
};