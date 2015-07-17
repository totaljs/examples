exports.install = function() {
    F.route('/', view_index);
};

function view_index() {
    var self = this;
    var users = DATABASE('users');

    users.find({}).limit(10).toArray(function(err, docs) {
        self.view('index', docs);
    });

    // or
    // users.find().limit(10).toArray(self.callback('index'));
}