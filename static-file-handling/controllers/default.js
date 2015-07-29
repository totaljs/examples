exports.install = function() {
	F.route('/');
	F.file('All (.jpg, .png, .gif) images', image_resize);
};

function image_resize(req, res, isValidation) {

	if (isValidation)
		return req.extension.contains(['jpg', 'png', 'gif']);

	// this === framework
	framework.image(F.path.public(req.url), function(image) {
		// image === FrameworkImage
		image.resize('50%');
		image.quality(80);
		image.minify();
	});
}