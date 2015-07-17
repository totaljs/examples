exports.install = function() {
	F.route('/', view_index);
	F.route('/eval/', post_eval, ['post']);

};

function view_index() {
	var self = this;
	self.view('index', { text: 'console.log(\'from client side ...\');' });
}

function post_eval() {
	var self = this;
	F.eval(self.body.text);
	self.json({ r: true });
}