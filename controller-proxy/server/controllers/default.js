exports.install = function() {
	F.route('/', view_homepage);
	F.route('/otherwise/', view_otherwise);
};

function view_homepage() {

	var self = this;

	var db = {
		products: [],
		users: []
	};

	self.async.await(function(next) {
		self.proxy('http://127.0.0.1:8001', { age: 25 }, function(error, data) {
			console.log(error, data);

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

	self.async.run(() => self.json(db));
}

function view_otherwise() {

	var self = this;

	var db = {
		products: [],
		users: []
	};

	var fn = [];

	fn.push(function(next) {
		self.proxy('http://127.0.0.1:8001', { age: 25 }, function(error, data) {

			if (error)
				self.error(error);

			db.users = data;
			next();
		});
	});

	fn.push(function(next) {
		self.proxy('http://127.0.0.1:8002', {}, function(error, data) {

			if (error)
				self.error(error);

			db.products = data;
			next();
		});
	});

	fn.async(() => self.json(db));
}