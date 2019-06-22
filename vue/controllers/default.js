global.Vue = require('vue');
const Renderer = require('vue-server-renderer').createRenderer();
const App = require(PATH.root('public/assets/app.js'))();

exports.install = function() {
	ROUTE('/*', view_index);
};

function view_index() {
	var self = this;
	Renderer.renderToString(App, function(error, html) {
		if (error)
			self.throw500(error);
		else
			self.view('index', html);
	});
}
