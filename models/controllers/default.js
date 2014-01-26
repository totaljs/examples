exports.install = function(framework) {
	framework.route('/', json_homepage);
};

function json_homepage() {
	var self = this;
	var user = self.model('user');
	self.json(user);
}