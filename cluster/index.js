// ===================================================
// FOR DEVELOPMENT
// Total.js - framework for Node.js platform
// https://www.totaljs.com
// ===================================================

const options = {};

// options.ip = '127.0.0.1';
// options.port = parseInt(process.argv[2]);
// options.config = { name: 'Total.js' };

require('total.js').cluster.http(5, 'release', options);

// Use a terminal for testing:
// $ siege -b -r 10 http://127.0.0.1:8000/