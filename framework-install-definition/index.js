// ===================================================
// IMPORTANT: only for development
// total.js - web application framework for node.js
// http://www.totaljs.com
// ===================================================

var framework = require('total.js').http('debug');

framework.on('load', function() {
<<<<<<< HEAD
    framework.install('definition', 'https://www.totaljs.com/inject-definition.js');
=======
    framework.install('definition', 'https://www.totaljs.com/examples/inject-definition.js');
>>>>>>> origin/v1.7.0
});