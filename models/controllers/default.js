exports.install = function(framework) {
	framework.route('/', json_homepage);
};

function json_homepage() {
	var self = this;
	var user = MODEL('user');
	self.json(user, true);
}