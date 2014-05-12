exports.index = function view_index() {

    var self = this;
    
    var model = {
        pagetitle: 'Total.js',
    }

    self.layout('_sitelayout');
    self.view('index', model);
}