exports.install = function() {
	F.route('/');
	F.route('/live/', view_live);

	// uploading
	F.mmr('/', upload);
};

var files = [];

function upload(req, file, counter) {
	if (!file)
		return;
	console.log('UPLOAD', counter);
	if (files.length > 20)
		framework.unlink([files.shift()]);
	files.push(file.path);
}

function view_live() {
	var self = this;
	self.interval = setInterval(function() {

		if (!self.isConnected) {
			clearInterval(self.interval);
			return;
		}

		var latest = files[files.length - 1];
		if (self.filename === latest)
			return;

		self.filename = latest;
		self.mmr('live.jpg', latest);
	}, 500);
}