var fs = require('fs');

exports.install = function() {
	F.route('/', file_download);
};

function file_download() {
	var self = this;
	self.stream('application/pdf', fs.createReadStream(F.path.public('totaljs.pdf')), 'logo.pdf');
}