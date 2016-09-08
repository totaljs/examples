require('total.js');

const Url = require('url');
const Http = require('http');
const Path = require('path');
const Fs = require('fs');

// directory must contain only files
//var directory = process.;

var BOUNDARY = '----' + Math.random().toString(16).substring(2);
var files = [];

function send(url) {

	var indexer = 0;
	var counter = 0;
	var uri = Url.parse(url);
	var headers = { 'Content-Type': 'multipart/x-mixed-replace; boundary=' + BOUNDARY };
	var options = { protocol: uri.protocol, auth: uri.auth, method: 'POST', hostname: uri.hostname, port: uri.port, path: uri.path, agent: false, headers: headers };

	var response = function(res) {
		res.on('end', () => console.log(res.statusCode));
		res.resume();
	};

	var con = Http;
	var req = con.request(options, response);

	req.on('error', (err) => console.log('ERROR', err, err.stack));

	function sendfile(filename, cb) {
		var header = '\r\n\r\n--' + BOUNDARY + '\r\nContent-Disposition: form-data; name="File"; filename="' + Path.basename(filename) + '"\r\nContent-Type: ' + U.getContentType(U.getExtension(filename)) +'\r\n\r\n';
		req.write(header);
		var stream = Fs.createReadStream(filename);
		stream.pipe(req, { end: false });
		stream.on('end', cb);
	}

	function run() {
		counter++;

		if (counter > 50) {
			req.end('\r\n\r\n--' + BOUNDARY + '--');
			console.log('END');
			return;
		}

		setTimeout(function() {
			var file = files[indexer++];

			if (!file) {
				indexer = 0;
				file = files[indexer++];
			}

			if (file.length) {
				console.log('–---->', file);
				sendfile(file, run);
			}
		}, 500);
	}

	run();
};

var directory = process.cwd();

Fs.readdirSync(directory).forEach(function(filename){
	if (filename.lastIndexOf('.jpg') !== -1)
		files.push(Path.join(directory, filename));
});

send('http://127.0.0.1:8000/');