exports.install = function(framework, options) {
	framework.route('/', view_homepage);
}

function view_homepage() {
	var self = this;
	self.json(framework.global.weather);
}