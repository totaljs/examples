exports.install = function() {
	F.route('/', json_index);

	// Recommend:
	F.route('/array/',  json_array);
	F.route('/array2/',  json_array2);
	F.route('/number/', json_number);
};

function json_index() {

	var self = this;
	var response = [];
	var async = new U.Async();

	async.await(function(complete) {
		U.request('https://www.google.com', ['get'], function(err, data) {
			var output = err ? 'error' : data.length.toString();
			response.push('www.google.com -> ' + output);
			complete();
		});
	});

	async.await(function(complete) {
		U.request('http://www.expressjs.com', ['get'], function(err, data) {
			var output = err ? 'error' : data.length.toString();
			response.push('www.expressjs.com -> ' + output);
			complete();
		});
	});

	async.await(function(complete) {
		U.request('http://www.yahoo.com', ['get'], function(err, data) {
			var output = err ? 'error' : data.length.toString();
			response.push('www.yahoo.com -> ' + output);
			complete();
		});
	});

	async.await('partial', function(complete) {
		U.request('http://www.totaljs.com', ['get'], function(err, data) {
			var output = err ? 'error' : data.length.toString();
			response.push('www.totaljs.com -> ' + output);
			complete();
		});
	});

	// waiting for await('partial')
	async.wait('waiting 1', 'partial', function(complete) {
		console.log('waiting 1 complete');
		setTimeout(() => complete(), 1000);
	});

	// waiting for wait('waiting')
	async.wait('waiting 2', 'waiting 1', function(complete) {
		console.log('waiting 2 complete');
		setTimeout(() => complete(), 1000);
	});

	async.run(function() {
		if (self.xhr)
			return self.json(response);
		self.view('index', response);
	});
}

function json_array() {
	var async = [];
	var response = [];
	var self = this;

	async.push(function(next) {
		U.request('https://www.google.com', ['get'], function(err, data) {
			var output = err ? 'error' : data.length.toString();
			response.push('www.google.com -> ' + output);
			next();
		});
	});

	async.push(function(next) {
		U.request('http://www.expressjs.com', ['get'], function(err, data) {
			var output = err ? 'error' : data.length.toString();
			response.push('www.expressjs.com -> ' + output);
			next();
		});
	});

	async.push(function(next) {
		U.request('http://www.yahoo.com', ['get'], function(err, data) {
			var output = err ? 'error' : data.length.toString();
			response.push('www.yahoo.com -> ' + output);
			next();
		});
	});

	async.async(() => self.json(response));
}

function json_array2() {
	var url = ['https://www.google.com', 'http://www.expressjs.com', 'http://www.yahoo.com'];
	var response = [];
	var self = this;

	url.wait(function(item, next) {
		U.request(item, ['get'], function(err, data) {
			var output = err ? 'error' : data.length.toString();
			response.push(item + ' -> ' + output);
			next();
		});
	}, () => self.json(response));
}

function json_number() {

	var self = this;
	var response = [];
	var url = ['https://www.google.com', 'http://www.expressjs.com', 'http://www.yahoo.com'];
	var count = url.length;

	count.async(function(index, next) {

		index -= 1;

		U.request(url[index], ['get'], function(err, data) {
			var output = err ? 'error' : data.length.toString();
			response.push(url[index] + ' -> ' + output);
			next();
		});

	}, () => self.json(response));
}