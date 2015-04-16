exports.install = function() {
    F.route('/', view_index);
};

function *view_index() {
    var self = this;
    var users = yield sync(DATABASE('users').$$all(n => n.age > 28 && n.age < 40))();
    self.view(users);
}