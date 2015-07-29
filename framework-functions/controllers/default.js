exports.install = function() {
	F.route('/', plain_index);
};

function plain_index() {

	var self = this;
	var now = F.functions.now();

    // or

    var hello = FUNCTION('hello')();
	self.plain(now.format('dd.MM.yyyy - HH:mm:ss') + ' - ' + hello);
}