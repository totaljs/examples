var fs = require('fs');

exports.install = function(framework) {
	framework.route('/', file_download);
};

function file_download() {
	var self = this;
	self.stream('application/pdf', fs.createReadStream(self.path.public('totaljs.pdf')), 'logo.pdf');
}