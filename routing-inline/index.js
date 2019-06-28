// ===================================================
// IMPORTANT: only for development
// total.js - web application framework for node.js
// http://www.totaljs.com
// ===================================================

require('total.js').http('debug');

// INLINE ROUTING
ROUTE('/', function() {
	this.plain('HOMEPAGE');
});