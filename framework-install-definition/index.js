// ===================================================
// IMPORTANT: only for development
// total.js - web application framework for node.js
// http://www.totaljs.com
// ===================================================

require('total.js').http('debug');

F.on('load', function() {
    F.install('definition', 'https://www.totaljs.com/examples/inject-definition.js');
});