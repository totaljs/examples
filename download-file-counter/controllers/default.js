var path = require('path');
var counter = 0;

exports.install = function() {

	// route index
	F.route('/', view_homepage);

	// file route
	F.file('*.pdf', file_download);

};

function view_homepage() {
	var self = this;
	self.plain(self.req.hostname('/totaljs.pdf') + '\n\nDownload count: ' + counter);
};

function file_download(req, res, isValidation) {

	// this === framework
	var filename = U.getName(req.url);

	counter++;

	// response file
	res.file(F.path.public(filename), filename);
};