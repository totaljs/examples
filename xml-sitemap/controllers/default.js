exports.install = function() {
	F.route('/', view_index);
	F.file('sitemap.xml', file_xml);
}

function view_index() {
	var self = this;
	self.plain(self.hostname('sitemap.xml'));
}

function file_xml(req, res, validation) {

	if (validation)
		return req.url === '/sitemap.xml';

	var self = this;
	var hostname = req.hostname();
	var lastmod = new Date().format('yyyy-MM-dd');

	var write = function(url, lastmod, priority, changefreq) {
		var str = '<url><loc>' + url.encode() + '</loc><lastmod>' + lastmod + '</lastmod><changefreq>' + changefreq + '</changefreq><priority>' + priority + '</priority></url>';
		res.write(str);
	};

	res.writeHead(200, { 'Content-Type': 'text/xml' });
	res.write('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.google.com/schemas/sitemap/0.84">');

	// Use workers for larger sitemaps

	write(hostname + '/', lastmod, '1.0000', 'weekly');
	write(hostname + '/products/', lastmod, '0.3', 'monthly');
	write(hostname + '/contact/', lastmod, '0.3', 'monthly');

	res.write('</urlset>');
	res.end();
}

