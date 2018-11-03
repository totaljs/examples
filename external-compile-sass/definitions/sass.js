var sass = require('node-sass');
var Fs = require('fs');

F.accept('scss', 'text/css');

F.helpers.scss = function(name) {
	return '<link type="text/css" rel="stylesheet" href="' + F.routeStyle(name).replace(/\.css$/, '') + '" />';
};

FILE(function(req, res, is) {
	if (is)
		return req.extension === 'scss';
	F.exists(req, res, 20, function(next, tmp) {
		var filename = F.path.public(req.url);
		Fs.readFile(filename, function(err, data) {
			if (err) {
				next();
				res.throw404();
			} else {
				var content = F.onCompileStyle(filename, data.toString('utf8'));
				RELEASE && Fs.writeFile(tmp, content);
				res.content(200, content, 'text/css', true);
			}
		});
	});
});

F.onCompileStyle = function (filename, content) {
	return sass.renderSync({ file: filename, data: content, outputStyle: 'compressed' }).css.toString('utf8');
};