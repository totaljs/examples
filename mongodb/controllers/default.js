exports.install = function(framework) {
    framework.route('/', view_index);
};

function view_index() {
    var self = this;
    var users = DATABASE('users');
    // or
    // var users = framework.database('user');
    // or
    // var users = self.database('user');
    users.find({}).limit(10).toArray(function(err, docs) {
        self.view('index', docs);
    });
    // or
    // users.find().limit(10).toArray(self.callback('index'));
}