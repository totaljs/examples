exports.install = function() {
	F.route('/');
	F.file('/*.*', image_resize, ['.jpg', '.png', '.gif']);
};

function image_resize(req, res) {
	res.image(F.path.public(req.url), function(image) {
		// image === FrameworkImage
		image.resize('80%');
		image.quality(80);
		image.minify();
	});
}