exports.install = function() {
	ROUTE('GET /', action);
};

function action() {
	var self = this;
	var model = {};
	model.name = 'Total.js';
	self.view('index', model);
}