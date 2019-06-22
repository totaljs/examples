var Fs = require('fs');

exports.install = function() {
	ROUTE('GET /', file_download);
};

function file_download() {
	var self = this;
	self.stream('application/pdf', Fs.createReadStream(F.path.public('totaljs.pdf')), 'logo.pdf');
}