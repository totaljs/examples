exports.install = function() {
	F.restful('/users/', [], json_user_query, json_user_get, json_user_save, json_user_delete);
	// ... is same as:
	// F.route('/user/', json_user_query);
	// F.route('/user/{id}/', json_user_get);
	// F.route('/user/{id}/', json_user_save, ['post', 'json']);
    // F.route('/user/{id}/', json_user_delete, ['delete']);
};

/*
	Description: Get users
	Method: GET
	Output: JSON
*/
function json_user_query() {

	var self = this;

    var User = MODEL('user').db

    User.find({}, function (err, docs) {
		self.json(docs);
	});
}

/*
	Description: Get user
	Method: GET
	Output: JSON
*/
function json_user_get(id) {

	var self = this;

	// self.model('user').Schema;
	// framework.model('user').Schema;
	var User = MODEL('user').db;

    User.findOne({ _id: id }, function (err, doc) {
		self.json(doc);
	});

}

/*
	Description: Save user
	Method: POST
	Output: JSON
*/
function json_user_save(id) {

	var self = this;

	// self.model('user').Schema;
	// framework.model('user').Schema;
	var User = MODEL('user').db;

	console.log('save ->', id);

	// What is it? https://github.com/totaljs/examples/tree/master/changes
	self.change('user: save, id: ' + id);

    User.update({_id: id}, self.post, function (err, result) {
        if (err) {
            self.json({ 'error': 'An error has occurred' });
        } else {
            self.json(result);
        }
    });
}

/*
	Description: Delete user
	Method: DELETE
	Output: JSON
*/
function json_user_delete(id) {

	var self = this;

	// self.model('user').Schema;
	// framework.model('user').Schema;
	var User = MODEL('user').db;

	console.log('delete ->', id);

	// What is it? https://github.com/totaljs/examples/tree/master/changes
	self.change('user: deleted, id: ' + id);

    User.remove({ '_id': id }, function (err, result) {
        if (err) {
            self.json({ 'error': 'An error has occurred' });
        } else {
            self.json(result);
        }
    });
}