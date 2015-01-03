exports.install = function(framework) {
	framework.route('/', view_index);
	framework.route('/cancel/', view_cancel);
};

function view_index() {
	this.plain('view_index');
}

function view_cancel() {
	this.plain('view_cancel');
}