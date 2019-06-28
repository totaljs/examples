exports.install = function() {
	ROUTE('GET /',                                   view_homepage);
	ROUTE('GET /{category}/',                        view_homepage);
	ROUTE('GET /contact/',                           view_contact);
	ROUTE('GET /products/',                          view_products);
	ROUTE('GET /products/{category}/',               view_products);
	ROUTE('GET /products/{category}/{subcategory}/', view_products);

	// this route has a lower priority and it will be executed when:
	// url: /wildcard/
	// url: /wildcard/bla/bla/bla/bla/
	ROUTE('GET /wildcard/*',                         view_wildcard);

	// route: all txt files
	// Try: http://127.0.0.4/test.txt
	FILE('*.txt', static_txt);

	// route: all jpg files
	// all images will resized about 50%
	// Try: http://127.0.0.4/header.jpg
	FILE('*.jpg', static_jpg);
};

function static_txt(req, res) {
	// responds
	// this === framework
	res.content(200, 'Server time: ' + new Date().toString(), 'text/plain');
}

function static_jpg(req, res) {
	res.image(PATH.public(req.url), function (image) {
		// image === FrameworkImage
		image.resize('50%');
		image.quality(80);
		image.minify();
	});
}

function view_homepage(category) {

	category = category || '';

	if (category.length)
		category = ' -> ' + category;

	this.plain('homepage{0}'.format(category));
}

function view_contact() {
	this.plain('contact');
}

function view_products(category, subcategory) {

	category = category || '';
	subcategory = subcategory || '';

	if (category.length)
		category = ' -> ' + category;

	if (subcategory.length)
		subcategory = ' -> ' + subcategory;

	this.plain('products{0}{1}'.format(category, subcategory));
}

function view_wildcard() {
	var self = this;
	self.plain('asterix -> ' + self.uri.pathname);
}