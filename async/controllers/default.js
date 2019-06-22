exports.install = function() {
	ROUTE('/', json_index);
};

function json_index() {

	var self = this;
	var model = [];
	var url = ['https://www.google.com', 'http://www.expressjs.com', 'http://www.yahoo.com', 'http://www.totaljs.com'];

	url.wait(function(url, next) {
		RESTBuilder.GET(url).exec(function(err, response, output) {
			// "response" can contain only parsed JSON/XML/URLEncoded, so in this case the response will be nullable
			model.push({ url: url, length: output.response.length });
			next();
		});
	}, function() {
		self.view('index', model);
	});
}