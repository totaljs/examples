exports.install = function() {
	F.mmr('/', upload);
};

var files = [];

function upload(req, file, counter) {

	if (file === null) {
		framework.unlink(files);
		return;
	}

	console.log('--->', counter, file.filename);
	files.push(file.path);
}