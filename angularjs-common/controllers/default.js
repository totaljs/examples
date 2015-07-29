exports.install = function() {
    F.route('/*', view_app);
};

function view_app() {
    var self = this;
    self.view('app');
}