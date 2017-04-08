exports.install = function() {

/*
	var db = NOSQL('images');
	db.insert({ file: db.binary.insert('logo.png', 'image/png', require('fs').readFileSync('/users/petersirka/desktop/logo.png')) });
*/

	F.route('/', view_homepage);
	F.file('*.png', static_image);
};

function view_homepage() {
	var self = this;
	self.plain('http://{0}:{1}/1392394046499rjdobt9.png'.format(F.ip, F.port));
}

// Serve image from database products
function static_image(req, res) {

	var db = NOSQL('images');
	var id = req.uri.pathname.replace('/', '').replace('.png', '');

	// Check the client cache via etag
	// if not modified - framework sends automatically 304
	// id === etag
	/*
	if (F.notModified(req, res, id))
		return;
	*/

	db.binary.read(id, function(err, stream, header) {

		if (err) {
			res.throw404();
			return;
		}

		// Set HTTP cache via etag
		// F.setModified(req, res, id);

		res.image(stream, function(image) {
			image.resize('50%');
			image.output('png');
			image.minify();
		});

		// or
		// res.stream('image/png', stream);
	});
}