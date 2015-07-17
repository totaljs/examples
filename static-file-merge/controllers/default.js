exports.install = function() {
	F.route('/', view_homepage);
};

function view_homepage() {
	this.view('homepage');
}