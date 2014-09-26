exports.install = function(framework) {
	framework.route('/', plain_homepage);
};

function plain_homepage() {
	var self = this;

	var layer = SOURCE('test');
    // or INCLUDE('test')

	self.plain(layer.hello());
}