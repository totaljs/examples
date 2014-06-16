exports.install = function(framework) {
	framework.route('/', view);
	framework.route('/b/', view, [], ['B']);
	framework.route('/c/', view, [], ['C']);
	framework.route('/all/', view, { middleware: ['B', 'C'] });
}

function view() {
	var self = this;
	self.json(self.repository);
}