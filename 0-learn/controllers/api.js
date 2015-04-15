var Users = MODEL('Users');

exports.install = function() {
    F.route('/api/users/', json_users_query);
    F.route('/api/users/{id}/', json_users_read);
    F.route('/api/users/{id}/', json_users_remove, ['delete']);
    F.route('/api/users/', json_users_save, ['put', 'json', '*User']);
};

function json_users_query() {
    var self = this;
    Users.User.query(self.query, self.callback());
}

function json_users_read(id) {
    var self = this;
    Users.User.get({ _id: id }, self.callback());
}

function json_users_remove(id) {
    var self = this;
    Users.User.remove({ _id: id }, self.callback());
}

function json_users_save() {
    var self = this;
    self.body.$async(self.callback()).$workflow('check').$save();
}