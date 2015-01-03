// ===================================================
// IMPORTANT: only for development
// total.js - web application framework for node.js
// http://www.totaljs.com
// ===================================================

var framework = require('total.js').http('debug');

framework.on('load', function() {
<<<<<<< HEAD
    framework.install('model', 'https://www.totaljs.com/inject-model.js');
=======
    framework.install('model', 'https://www.totaljs.com/examples/inject-model.js');
>>>>>>> origin/v1.7.0
});