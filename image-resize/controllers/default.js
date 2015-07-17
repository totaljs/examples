var Path = require('path');

exports.install = function() {
	F.route('/', view_index);

	// the number is maximum data receive
	F.route('/', view_index, ['upload'], 100); // max 100 kB
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

	var filename = F.path.public('upload.jpg');

	// Documentation: http://docs.totaljs.com/FrameworkImage/
	var image = file.image(); // this is equivalent to require('partail.js/image').init([useImageMagick]);

	// require('total.js/image').init(filename, [useImageMagick]);
	// file.image([useImageMagick]);

	// image.identify(function(err, info) { info.width, info.heigth });
	// image.resize(w, h, options);
	// image.resizeCenter(w, h); :: resize(w, h, '^').align('center center').crop(w, h);
	// image.crop(w, h, x, y);
	// image.scale(w, h);
	// image.quality(percentage);
	// image.align(type); :: left-top left-bottom left-center right-top right-bottom right-center top-center bottom-center center-center
	// image.blur(radius);
	// image.normalize();
	// image.rotate(deg);
	// image.flip();
	// image.flop();
	// image.minify();
	// image.grayscale();
	// image.background(color);
	// image.sepia();
	// image.command(command, [priority]);

	// IMPORTANT: see here https://github.com/petersirka/total.js/tree/master/examples/routing
	image.resizeCenter(300, 300).save(filename, function(err, filename) {
		model.url = '<div><img src="/{0}?ts={1}" width="300" height="300" alt="Uploaded image" /></div><br />'.format(Path.basename(filename), new Date().getTime());
		self.view('index', model);
	});

}