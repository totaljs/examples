exports.install = function() {
	ROUTE('GET /',        view_index);
	ROUTE('GET /cancel/', view_cancel);
};

function view_index() {
	this.plain('view_index');
}

function view_cancel() {
	this.plain('view_cancel');
}