exports.install = function() {
	ROUTE('GET  /',       view_index);
	ROUTE('GET  /other/', view_other);
	ROUTE('POST /other/', view_other_post);
};

function view_index() {
	var self = this;
	if (!self.transfer('/other/', ['post']))
		return self.throw404();
}

function view_other() {
	this.plain('OTHER - GET');
}

function view_other_post() {
	this.plain('OTHER - POST');
}