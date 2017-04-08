var Fs = require('fs');

exports.install = function() {
	F.route('/', view_index);
};

function *view_index() {
	var self = this;
	var users = yield sync(Fs.readFile)(F.path.databases('users.json'));
	users = JSON.parse(users.toString('utf8'));
	self.view(users);
}