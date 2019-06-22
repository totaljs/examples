exports.install = function() {

/*
	var db = NOSQL('images');
	db.insert({ file: db.binary.insert('logo.png', 'image/png', require('fs').readFileSync('/users/petersirka/desktop/logo.png')) });
*/

	ROUTE('GET /', view_homepage);
	FILE('*.png',  static_image);
};

function view_homepage() {
	var self = this;
	self.plain('http://{0}:{1}/1392394046499rjdobt9.png'.format(F.ip, F.port));
}

// Serve image from database products
function static_image(req, res) {
	var id = req.uri.pathname.replace('/', '').replace('.png', '');
	res.imagenosql('images', id, function(image) {
		image.resize('50%');
		image.output('png');
		image.minify();
	});
}