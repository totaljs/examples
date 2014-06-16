framework.on('load', function() {

	var self = this;

	// middleware - global
	self.middleware(function(complete) {

		// this middleware will be executed every request to the controller
		// this === controller

		var self = this;

		// self.req = Request
		// self.res = Response

		self.repository.A = 'middleware - global';

		complete();
	});

	// middleware - private
	self.middleware('B', function(complete) {

		// this middleware will be executed if "controller route" will contains @middleware ['B']
		// this === controller
		var self = this;

		// self.req = Request
		// self.res = Response

		self.repository.B = 'middleware - private - B';

		complete();
	});

	// middleware - private
	self.middleware('C', function(complete) {

		// this middleware will be executed if "controller route" will contains @middleware ['C']
		// this === controller
		var self = this;

		// self.req = Request
		// self.res = Response

		self.repository.C = 'middleware - private - C';

		complete();
	});

});