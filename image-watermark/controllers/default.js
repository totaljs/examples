exports.install = function() {
	ROUTE('GET  /', view_index);
	ROUTE('POST /', view_index, ['upload'], 10000); // max 100 kB
};

function view_index() {

	var self = this;
	var model = { info: '...' };

	var file = self.files[0];

	if (self.files.length === 0 || !file.isImage()) {
		self.view('index', model);
		return;
	}

	// file.isAudio();
	// file.isVideo();
	// file.isImage();

	model.info = file.filename + ' ({0} kB) - {1}x{2}'.format(Math.floor(file.length / 1024, 2), file.width, file.height);

	// =============================
	// $ brew install graphicsmagick
	// =============================

	var filename = PATH.public('upload.jpg');

	var image = file.image();

	image.watermark(PATH.public('watermark.png'), 20, 80, 120, 40);
	image.resize_center(300, 300).save(filename, function(err) {

		if (err) {
			self.throw500(err);
			return;
		}

		model.url = '<div><img src="/{0}?ts={1}" width="300" height="300" alt="Uploaded image" /></div><br />'.format(U.getName(filename), new Date().getTime());
		self.view('index', model);
	});

}