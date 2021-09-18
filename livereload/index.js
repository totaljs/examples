// ===================================================
// Total.js start script
// https://www.totaljs.com
// ===================================================

const options = {};

options.livereload = true;

/*
// A port number for live reload
options.livereload = 35729;
*/

/*
// A custom port number for live reload
options.livereload = 35729;
*/

/*
// A hostname for live reload on the SERVER-SIDE
// Total.js will use the "livereload.totaljs.com" service, but you need to specify a hostname in the form:
options.livereload = 'www.totaljs.com';
// <script src="//cdn.componentator.com/livereload.js"></script> uses "location.origin" value as the hostname identifier
*/

var type = process.argv.indexOf('--release', 1) !== -1 || process.argv.indexOf('release', 1) !== -1 ? 'release' : 'debug';
require('total4/' + type)(options);