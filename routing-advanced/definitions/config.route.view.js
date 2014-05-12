framework.on('controller', function(controller, name) {
    
    // Manage controller default directory for views // first method
    if (name.indexOf('admin/') !== -1)
        controller.currentView('/admin/');

     // Manage controller site-folder/file-name.js associated views // with  site.route
    if (name.indexOf('/site.route') !== -1)
        controller.currentView('/site/');
    
});
