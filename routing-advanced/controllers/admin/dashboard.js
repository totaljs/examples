exports.install = function(framework) {

    //Sets the controllers route
	framework.route('/admin', view_dashboard);

};

function view_dashboard() {

    var self = this;
    self.layout('_adminlayout');
    self.view('dashboard');
}
