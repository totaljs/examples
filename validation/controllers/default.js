exports.install = function() {
	F.route('/', 'index');
	F.route('/', json_contactform, ['post', '*Contact']);
};

function json_contactform() {
	var self = this;
	self.$save(self.callback());
}