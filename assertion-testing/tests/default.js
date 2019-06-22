TEST('FUNC.inc()', function() {
	FAIL(FUNC.inc(1) !== 2);
});

TEST('Test URL 1', '/1/', function(builder) {
	// builder === RESTBuilder
	builder.get();
	builder.exec(function(err, response, output) {
		FAIL(output.response !== '1');
	});
});

TEST('Test URL 2', '/2/', function(builder) {
	// builder === RESTBuilder
	builder.get();
	builder.exec(function(err, response, output) {
		FAIL(output.response !== '2', 'additional description');
		OK(output.status === 200, 'HTTP status');
	});
});

TEST('Test URL 3', '/3/', function(builder) {
	// builder === RESTBuilder
	builder.json({ data: 4 });
	builder.exec(function(err, response) {
		FAIL(response.data !== 3);
	});
});