exports.install = function() {

	F.route('/api/hello', post_hello, ['post', 'raw']);

};

function post_hello() {
	var self = this;

	MODEL('hello').query(self.body).then((response) => {
		self.json(response);
	});
};