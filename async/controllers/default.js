exports.install = function(framework) {
	framework.route('/', view_index);
};

function view_index() {

	var self = this;
	var builder = [];

	self.await(function(complete) {
		utils.request('https://www.google.com', ['get'], null, function(err, data) {
			var output = err ? 'error' : data.length.toString();
			builder.push('www.google.com -> ' + output);
			complete();
		});
	});

	self.await(function(complete) {
		utils.request('http://www.expressjs.com', ['get'], null, function(err, data) {
			var output = err ? 'error' : data.length.toString();
			builder.push('www.expressjs.com -> ' + output);
			complete();
		});
	});

	self.await(function(complete) {
		utils.request('http://www.yahoo.com', ['get'], null, function(err, data) {
			var output = err ? 'error' : data.length.toString();
			builder.push('www.yahoo.com -> ' + output);
			complete();
		});
	});

	self.await('partial', function(complete) {
		utils.request('http://www.totaljs.com', ['get'], null, function(err, data) {
			var output = err ? 'error' : data.length.toString();
			builder.push('www.totaljs.com -> ' + output);
			complete();
		});
	});

	// waiting for await('partial')
	self.wait('waiting 1', 'partial', function(complete) {
		console.log('waiting 1 complete');
		setTimeout(function() {
			complete();
		}, 1000);
	});

	// waiting for wait('waiting')
	self.wait('waiting 2', 'waiting 1', function(complete) {
		console.log('waiting 2 complete');
		setTimeout(function() {
			complete();
		}, 1000);
	});

	/*
		self.run(function() {
			self.view('index', builder);
		});

		or ...
	*/

	if (self.xhr)
		self.jsonAsync(builder);
	else
		self.viewAsync('index', builder);
}