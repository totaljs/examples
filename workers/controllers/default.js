exports.install = function() {
	framework.route('/', view_index);
}

function view_index() {
	var self = this;
	self.json(framework.global.weather);
}