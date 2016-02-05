var PngQuant = require('pngquant');

Image.middleware('png', function() {
	return new PngQuant([128]);
});
