var path = require('path');
var counter = 0;

exports.install = function() {

	// route index
	F.route('/', view_homepage);

	// file route
	F.file('*.pdf counter', file_download);

};

function view_homepage() {
	var self = this;
	self.plain(self.req.hostname('/totaljs.pdf') + '\n\nDownload count: ' + counter);
};

function file_download(req, res, isValidation) {

	if (isValidation)
		return req.extension === 'pdf';

	// this === framework
	var filename = path.basename(req.url);

	counter++;

	// response file
	res.file(F.path.public(filename), filename);
};