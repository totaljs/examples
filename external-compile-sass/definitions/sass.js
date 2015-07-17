var sass = require('node-sass');
var Fs = require('fs');

F.accept('scss', 'text/css');

F.helpers.scss = function(name) {
	return '<link type="text/css" rel="stylesheet" href="' + F.routeStyle(name).replace(/\.css$/, '') + '" />';
};

F.file('*.scss', function(req, res, is) {
	if (is)
		return req.extension === 'scss';

	F.exists(req, res, 20, function(next, tmp) {
		var filename = F.path.public(req.url);
		Fs.readFile(filename, function(err, data) {

			if (err) {
				next();
				res.throw404();
				return;
			}

			var content = F.onCompileStyle(filename, data.toString('utf8'));
			if (!F.isDebug)
				Fs.writeFile(tmp, content);
			F.responseContent(req, res, 200, content, 'text/css', true);
		});
	});
});

F.onCompileStyle = function (filename, content) {
    return sass.renderSync({ data: content, outputStyle: 'compressed' }).css.toString('utf8');
};