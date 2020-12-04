exports.install = function() {
	ROUTE('GET /', view_index);
	ROUTE('GET /', json_index, ['xhr']);
};

function view_index() {
	var self = this;
	self.view('index');
}

function json_index() {
	var self = this;
	// console.log(TRANSLATE(self.language, 'Welcome')); --> converts "Welcome" to hash code
	self.json({ message: RESOURCE(self.language, 'message') });
}