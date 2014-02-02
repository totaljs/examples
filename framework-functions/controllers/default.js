exports.install = function(framework) {
	framework.route('/', plain_homepage);
};

function plain_homepage() {
	var self = this;
	
	var now = framework.functions.now();
	var hello = framework.functions.hello();

	self.plain(now.format('dd.MM.yyyy - HH:mm:ss') + ' - ' + hello);
}