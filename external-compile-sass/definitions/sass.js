var sass = require('node-sass');

framework.onCompileStyle = function (filename, content) {
	// if filename === '' then it is the inline style
	return sass.renderSync({ data: content, outputStyle: 'compressed' });
};