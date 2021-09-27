exports.install = function() {
	ROUTE('GET  /');

	ROUTE('POST /api/send/  *ContactForms --> save');
	ROUTE('POST /api/upload/', upload, 1024 * 5); // max. 5 MB
};

function upload() {
	var self = this;
	var file = self.files[0];
	if (file)
		file.fs('files', UID(), (err, meta) => self.json(meta));
	else
		self.invalid(400);
}