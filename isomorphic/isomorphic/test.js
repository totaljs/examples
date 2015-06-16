exports.url = '/test.js';

exports.getName = function() {
	// is_server
    return 'CODE called from ' + (is_client ? 'client' : 'server');
};