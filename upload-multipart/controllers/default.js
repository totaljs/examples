exports.install = function() {
	ROUTE('GET  /', view_homepage);

	// the number is maximum data receive
	ROUTE('POST /', view_homepage, ['upload'], 100); // max. 100 kB
};

function view_homepage() {
	var self = this;

	var model = { info: '...' };

	if (self.files.length > 0)
		model.info = self.files[0].filename + ' ({0} kB - {1}x{2})'.format(Math.floor(self.files[0].length / 1024, 2), self.files[0].width, self.files[0].height);

	self.view('index', model);
}