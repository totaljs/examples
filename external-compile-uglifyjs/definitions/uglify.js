var uglify = require('uglify-js');

framework.onCompileScript = function (filename, content) {
	// if filename === '' then it is the inline script
	return uglify.minify(content, { fromString: true }).code;
};