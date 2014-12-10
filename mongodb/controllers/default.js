exports.install = function(framework) {
    framework.route('/', view_homepage);
};

function view_homepage() {
    var self = this;

    var users = DATABASE('users');

    // or
    // var users = framework.database('user');
    // or
    // var users = self.database('user');

    users.find({}).limit(10).toArray(function(err, docs) {
        self.view('homepage', docs);
    });

    // or
    // users.find().limit(10).toArray(self.callback('homepage'));
}