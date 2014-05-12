exports.install = function (framework) {
    
    //Sets the controllers route
    framework.route('/admin/articles', view_articles);

};

function view_articles() {
    
    var self = this;
    self.layout('_adminlayout');
    self.view('articles');
    
}


