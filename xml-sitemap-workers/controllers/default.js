var isGenerating = false;
var isGenerated = false;

exports.install = function() {
	framework.route('/', view_index);
	framework.file('sitemap.xml', file_xml);
}

function view_index() {
	var self = this;
	self.plain(self.hostname('sitemap.xml'));
}

function file_xml(req, res, validation) {

	if (validation)
		return req.url === '/sitemap.xml';

	var options = { hostname: req.hostname(), path: framework.path.public('sitemap.xml') };

	// Is processed sitemap.xml?
	if (isGenerated) {
		console.log('sitemap.xml -> cache');
		framework.responseStatic(req, res);
		return;
	}

	// Handle multiple requests
	// [isGenerating === true] the request must wait
	if (isGenerating) {
		setTimeout(function() {
			file_xml(req, res, validation);
		}, 1000);
		return;
	}

	isGenerating = true;

	console.log('sitemap.xml -> creating');
	var worker = framework.worker('sitemap', 'sitemap', 5000);

	// Send settings
	worker.send(options);

	// Handle exit
	worker.once('exit', function() {

		console.log('sitemap.xml -> created');

		isGenerating = false;
		isGenerated = true;

		framework.responseStatic(req, res);
	});

}