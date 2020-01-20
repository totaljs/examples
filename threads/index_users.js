// ===================================================
// FOR DEVELOPMENT
// Total.js - framework for Node.js platform
// https://www.totaljs.com
// ===================================================

const options = {};

// options.ip = '127.0.0.1';
// options.port = parseInt(process.argv[2]);

options.max = 10; // A maximum count of allowed 5 threads
options.thread = 'users'; // Thread name
require('total.js').cluster.http('auto', 'debug', options);

// Use a terminal for testing:
// $ siege -b -r 10 http://127.0.0.1:8000/api/users/