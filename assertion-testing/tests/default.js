TEST('controller.increment()', function() {
	FAIL(F.controller('default').functions.increment(1) !== 2);
});

TEST('Test URL 1', '/1/', function(builder) {
	builder.get();
	builder.exec(function(err, response, output) {
		FAIL(output.response !== '1', name);
	});
});

TEST('Test URL 2', '/2/', function(builder) {
	builder.get();
	builder.exec(function(err, response, output) {
		FAIL(output.response !== '2', name);
	});
});

TEST('Test URL 3', '/3/', function(builder) {
	builder.json({ data: 4 });
	builder.exec(function(err, response) {
		FAIL(response.data !== 3, name);
	});
});