exports.install = function(framework) {
	framework.route('/', plain_index);
};
function plain_index() {
	var self = this;
	self.empty();
}