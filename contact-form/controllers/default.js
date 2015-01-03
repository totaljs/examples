exports.install = function(framework) {
	framework.route('/', view_form);
	framework.route('/', json_form, ['xhr', 'post', '*web/ContactForm']);
};

function view_form() {
	this.view('form', SCHEMA('web', 'ContactForm').create());
}

function json_form() {
	var self = this;
	self.body.Ip = self.ip;
	self.body.$save(self.callback());
}
