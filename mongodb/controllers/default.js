exports.install = function(framework) {
<<<<<<< HEAD
    framework.route('/', view_homepage);
};

function view_homepage() {
    var self = this;

    var users = DATABASE('users');

=======
    framework.route('/', view_index);
};

function view_index() {
    var self = this;
    var users = DATABASE('users');
>>>>>>> origin/v1.7.0
    // or
    // var users = framework.database('user');
    // or
    // var users = self.database('user');

    users.find({}).limit(10).toArray(function(err, docs) {
<<<<<<< HEAD
        self.view('homepage', docs);
    });

    // or
    // users.find().limit(10).toArray(self.callback('homepage'));
=======
        self.view('index', docs);
    });
    // or
    // users.find().limit(10).toArray(self.callback('index'));
>>>>>>> origin/v1.7.0
}