exports.install = function() {
	F.route('/', view_index);
	F.route('/cancel/', view_cancel);
};

function view_index() {
	this.plain('view_index');
}

function view_cancel() {
	this.plain('view_cancel');
}