exports.install = function(framework) {
	framework.route('/');
	framework.file('All (.jpg, .png, .gif) images', image_resize);
};

function image_resize(req, res, isValidation) {

	if (isValidation)
		return req.url.contains(['.jpg', '.png', '.gif']);

	// this === framework
	framework.responseImage(req, res, this.path.public(req.url), function (image) {
		// image === FrameworkImage
		image.resize('50%');
		image.quality(80);
		image.minify();
	});
}