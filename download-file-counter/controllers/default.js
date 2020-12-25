var counter = 0;

exports.install = function() {

	// route index
	ROUTE('GET /', view_homepage);

	// file route
	ROUTE('FILE /*.pdf', file_download);
};

function view_homepage() {
	var self = this;
	self.plain(self.req.hostname('/totaljs.pdf') + '\n\nDownload count: ' + counter);
}

function file_download(req, res) {

	// this === framework
	var filename = U.getName(req.url);

	counter++;

	// response file
	res.file(PATH.public(filename), filename);
}