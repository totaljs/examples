// ===================================================
// IMPORTANT: only for development
// total.js - web application framework for node.js
// http://www.totaljs.com
// ===================================================

var framework = require('total.js').http('debug');

framework.on('load', function() {
    framework.install('module', 'http://www.totaljs.com/inject-module.js');
});