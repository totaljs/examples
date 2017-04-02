global.Vue = require('vue');
var renderer = require('vue-server-renderer').createRenderer();
var app = require(F.path.root('public/assets/app.js'))();

exports.install = function() {
	F.route('/*', view_index);	
};

function view_index() {
	var self = this;

	renderer.renderToString(app, function(error, html) {
			
		if (error) {
				
			self.throw500(error);
		}
		
		self.view('index', html);
	});
}
