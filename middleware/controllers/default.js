exports.install = function(framework) {
	framework.route('/', view, ['#A']);
	framework.route('/b/', view, [], ['B']);
	framework.route('/c/', view, ['#C']); // if flag starts with # then is registered as middleware
	framework.route('/all/', view, { middleware: ['A', 'B', 'C'] });
}

function view() {
	var self = this;
	self.json(self.repository);
}