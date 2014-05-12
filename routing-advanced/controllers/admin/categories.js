exports.install = function (framework) {

    //Sets the controllers route
    framework.route('/admin/categories', view_categories);

};

function view_categories() {
	
    var self = this;

    self.layout('_adminlayout');
    self.view('categories'); 
    
}
