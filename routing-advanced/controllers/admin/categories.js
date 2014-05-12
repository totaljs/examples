exports.install = function (framework) {
    framework.route('/admin/categories', view_categories);
    framework.route('/admin/categories', json_categories, ['xhr', 'post']);
};

function view_categories() {
	
    var self = this;
    
    var model = {
        pagetitle: 'Categories',
        pagesubtitle: 'Manage your categories'
    }

    self.layout('_adminlayout');
    
    //To /views/admin/categories;
    self.view('categories', model); 
    //alternative method ON override 
    // self.view('admin.categories', model);
    // self.view('admin.custom-name', model);
    
}


function json_categories() {
    
    var self = this;
    var host = self.host();
    var success = false;
    var field = self.validate(self.post, ['categorytitle', 'parentcategory']);
    
    if (!self.cors(''+ host +'/*', ['POST'])) {
		self.plain('Not allowed');
		return;
	}
  
    if (field.hasError()) {
        self.json(field);
        return;
    } else {
        success = true;
    }

}