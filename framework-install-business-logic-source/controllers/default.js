exports.install = function() {
	F.route('/', plain_index);
};

function plain_index() {
	var self = this;

	var layer = SOURCE('test');
    // or INCLUDE('test')

	self.plain(layer.hello());
}