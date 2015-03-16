exports.install = function() {
	F.route('/', view_index);
	F.route('/', json_index, ['xhr']);
};

function view_index() {
	var self = this;
	self.view('index');
}

function json_index(language) {
	var self = this;
	// console.log(TRANSLATE(self.language, 'Welcome')); --> converts "Welcome" to hash code
	self.json({ message: RESOURCE(self.language, 'message') });
}