exports.install = function(framework) {
	framework.route('/', plain_index);
};

function plain_index() {
	var self = this;

	var layer = SOURCE('test');
    // or INCLUDE('test')

	self.plain(layer.hello());
}