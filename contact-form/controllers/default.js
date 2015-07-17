exports.install = function() {
	F.route('/', view_form);
	F.route('/', json_form, ['xhr', 'post', '*ContactForm']);
};

function view_form() {
	this.view('form', GETSCHEMA('ContactForm').create());
}

function json_form() {
	var self = this;
	self.body.Ip = self.ip;
	self.body.$save(self.callback());
}
