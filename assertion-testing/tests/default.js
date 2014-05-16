var assert = require('assert');

exports.run = function(framework, name) {

	/**
     * @see {@link http://docs.totaljs.com/Framework/#framework.assert|Documentation}
	 */

	framework.assert('controller.increment()', function(next, name) {
		assert.ok(framework.controller('default').functions.increment(1) === 2, name);
		next();
	});

	framework.assert('Test URL 1', '/1/', ['GET'], function(error, data, code, headers, cookies, name) {
		console.log(data, code)
		assert.ok(code === 200 && data === '1', name);
		console.log('1');
	});

	framework.assert('Test URL 2', '/2/', ['GET'], function(error, data, code, headers, cookies, name) {
		assert.ok(code === 200 && data === '2', name);
		console.log('2');
	});

	framework.assert('Test URL 3', '/3/', ['GET'], function(error, data, code, headers, cookies, name) {
		// throws error, data === 4
		assert.ok(code === 200 && data === '3', name);
		console.log('3');
	});

};