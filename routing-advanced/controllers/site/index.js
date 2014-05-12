exports.index = function view_index() {

    var self = this;
    
    var model = {
        pagetitle: 'FIREPOWER FIREWORKS',
    }

    self.layout('_sitelayout');
    self.view('index', model);
}