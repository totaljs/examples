var Users = MODEL('Users');

exports.install = function() {
    F.restful('/api/users/', ['*User'], json_users_query, json_users_read, json_users_remove, json_users_save);
    // Is same as:
    // F.route('/api/users/', json_users_query);
    // F.route('/api/users/{id}/', json_users_read);
    // F.route('/api/users/', json_users_save, ['post', '*User']);
    // F.route('/api/users/{id}/', json_users_save, ['put', '*User']);
    // F.route('/api/users/{id}/', json_users_remove, ['delete']);
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

function json_users_save(id) {
    var self = this;
    self.body._id = ObjectID.parse(id);
    self.body.$async(self.callback()).$workflow('check').$save();
}