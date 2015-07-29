exports.install = function() {
	F.route('/', view_index);
	F.route('/other/', view_other);
    F.route('/other/', view_other_post, ['post']);
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