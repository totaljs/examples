exports.run = function(framework) {

	/**
     * @see {@link http://docs.totaljs.com/Framework/#framework.assert|Documentation}
	 */

	framework.assert('controller.increment()', function(next, name) {
		assert.ok(framework.controller('default').functions.increment(1) === 2, name);
		next();
	});

	framework.assert('Test URL 1', '/1/', ['get'], function(error, data, code, headers, cookies, name) {
		assert.ok(code === 200 && data === '1', name);
	});

	framework.assert('Test URL 2', '/2/', ['get'], function(error, data, code, headers, cookies, name) {
		assert.ok(code === 200 && data === '2', name);
	});

	framework.assert('Test URL 3', '/3/', ['post', 'json'], function(error, data, code, headers, cookies, name) {
		// throws error, data === 4
		assert.ok(code === 200 && JSON.parse(data).data === 3, name);
	}, { data: 4 });

};