exports.install = function() {
	F.route('/', view_homepage);
	F.route('/contact/', view_contact);
	F.route('/products/', view_products);
	F.route('/products/{category}/', view_products);
	F.route('/products/{category}/{subcategory}/', view_products);
	F.route('/{category}/', view_homepage);

	// this route has a lower priority and it will be executed when:
	// url: /asterix/
	// url: /asterix/bla/bla/bla/bla/
	F.route('/asterix/*', view_asterix);

	// route: all txt files
	// Try: http://127.0.0.4/test.txt
	F.file('All *.txt', static_txt);

	// route: all jpg files
	// all images will resized about 50%
	// Try: http://127.0.0.4/header.jpg
	F.file('All *.jpg', static_jpg);
}

function static_txt(req, res, isValidation) {

	if (isValidation)
		return req.extension === 'txt';

	// generate response
	// this === framework
	// Documentation: http://docs.totaljs.com/Framework/#framework.responsContent
	res.content(200, 'Server time: ' + new Date().toString(), 'text/plain');
}

function static_jpg(req, res, isValidation) {

	if (isValidation)
		return req.extension === 'jpg';

	// generate response
	// this === framework
	res.image(F.path.public(req.url), function (image) {
		// image === FrameworkImage
		image.resize('50%');
		image.quality(80);
		image.minify();
	});
}

function view_homepage(category) {

	category = category || '';

	if (category.length > 0)
		category = ' -> ' + category;

	this.plain('homepage{0}'.format(category));
}

function view_contact() {
	this.plain('contact');
}

function view_products(category, subcategory) {

	category = category || '';
	subcategory = subcategory || '';

	if (category.length > 0)
		category = ' -> ' + category;

	if (subcategory.length > 0)
		subcategory = ' -> ' + subcategory;

	this.plain('products{0}{1}'.format(category, subcategory));
}

function view_asterix() {
	var self = this;
	self.plain('asterix -> ' + self.uri.pathname);
}