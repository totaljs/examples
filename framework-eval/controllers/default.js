exports.install = function(framework) {
	framework.route('/', view_index);
	framework.route('/eval/', post_eval, ['post']);

};

function view_index() {
	var self = this;
	self.view('index', { text: 'console.log(\'from client side ...\');' });
}

function post_eval() {
	var self = this;
	framework.eval(self.body.text);
	self.json({ r: true });
}