exports.install = function() {
	F.route('/', view, ['#A'], { options: 'for middleware' });
	F.route('/b/', view, ['#B']);
	F.route('/c/', view, ['#C']); // if flag starts with # then is registered as middleware
	F.route('/all/', view, ['#A', '#B', '#C']);
}

function view() {
	var self = this;
	self.json(self.repository);
}