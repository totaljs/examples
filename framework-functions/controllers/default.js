exports.install = function(framework) {
	framework.route('/', plain_homepage);
};

function plain_homepage() {
	var self = this;

	var now = framework.functions.now();

    // or

    var hello = FUNCTION('hello')();

	self.plain(now.format('dd.MM.yyyy - HH:mm:ss') + ' - ' + hello);
}