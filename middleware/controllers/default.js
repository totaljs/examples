exports.install = function() {
	ROUTE('GET /',     view, ['#A'], { options: 'for middleware' });
	ROUTE('GET /b/',   view, ['#B']);
	ROUTE('GET /c/',   view, ['#C']); // if the flag starts with # then is registered as middleware
	ROUTE('GET /all/', view, ['#A', '#B', '#C']);
};

function view() {
	var self = this;
	self.json(self.repository);
}