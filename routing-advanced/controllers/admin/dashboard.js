exports.install = function(framework) {
	framework.route('/admin', view_dashboard);
};

function view_dashboard() {

    var self = this;
    var thisdate = self.host();
    var model = {
        pagetitle: 'Dashboard',
        pagesubtitle: 'Control Panel',
    }

    self.layout('_adminlayout');
    self.view('dashboard', model);
}
