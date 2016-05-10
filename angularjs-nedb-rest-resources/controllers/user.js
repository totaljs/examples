exports.install = function() {
	F.restful('/users/', [], json_user_query, json_user_get, json_user_save, json_user_delete);
	// ... is same as:
	// F.route('/users/',      json_user_query);
	// F.route('/users/{id}/', json_user_get);
	// F.route('/users/',      json_user_save, ['post']);
	// F.route('/users/{id}/', json_user_save, ['put']);
    // F.route('/users/{id}/', json_user_delete, ['delete']);
};

/*
	Description: Get users
	Method: GET
	Output: JSON
*/
function json_user_query() {
	var self = this;
    nedb.users.find({}, self.callback());
}

/*
	Description: Get user
	Method: GET
	Output: JSON
*/
function json_user_get(id) {
	var self = this;
    nedb.users.findOne({ _id: id }, self.callback());
}

/*
	Description: Save user
	Method: POST
	Output: JSON
*/
function json_user_save(id) {
	var self = this;

	console.log('save ->', id);

	// What is it? https://github.com/totaljs/examples/tree/master/changes
	self.change('user: save, id: ' + id);
    nedb.users.update({_id: id}, self.body, self.callback());
}

/*
	Description: Delete user
	Method: DELETE
	Output: JSON
*/
function json_user_delete(id) {

	var self = this;

	console.log('delete ->', id);

	// What is it? https://github.com/totaljs/examples/tree/master/changes
	self.change('user: deleted, id: ' + id);
    nedb.users.remove({ '_id': id }, self.callback());
}