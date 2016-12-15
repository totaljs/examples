exports.install = function() {
	F.route('/', view_index);
};

function view_index() {
	this.view('index', { name: 'Peter', email: 'petersirka@gmail.com' });
}