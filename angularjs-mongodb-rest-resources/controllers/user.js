exports.install = function(framework) {
	framework.route('/user/', json_user_query);
	framework.route('/user/{id}/', json_user_get);
	framework.route('/user/{id}/', json_user_save, ['post', 'json']);
	framework.route('/user/{id}/', json_user_delete, ['delete']);
};

/*
	Description: Get users
	Method: GET
	Output: JSON
*/
function json_user_query() {

	var self = this;

	// self.model('user').Schema;
	// framework.model('user').Schema;
	var User = MODEL('user').Schema;

	console.log('query -> all');

	User.find(function(err, docs) {
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
	var User = MODEL('user').Schema;

	console.log('get ->', id);

	User.findById(id, function(err, doc) {
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
	var User = MODEL('user').Schema;

	console.log('save ->', id);

	// What is it? https://github.com/totaljs/examples/tree/master/changes
	self.change('user: save, id: ' + id);

	User.findById(id, function(err, doc) {
		// Please do not save a document (THANKS :-))
		// doc.save();
		self.json({ r: true });
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
	var User = MODEL('user').Schema;

	console.log('delete ->', id);

	// What is it? https://github.com/totaljs/examples/tree/master/changes
	self.change('user: deleted, id: ' + id);

	User.findById(id, function(err, doc) {
		// Please do not remove a document (THANKS :-))
		// doc.remove();
		self.json({ r: true });
	});

}