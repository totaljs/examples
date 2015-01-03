exports.install = function(framework) {
	framework.route('/', view_index);
	framework.route('/other/', view_other, ['get']);
    framework.route('/other/', view_other_post, ['post']);
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