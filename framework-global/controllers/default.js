exports.install = function(framework) {
	framework.route('/', view_index);
};

function view_index() {
	var self = this;

    // in some view: @{global.name}
	self.json(self.global);

	// or
	// self.json(framework.global);
}