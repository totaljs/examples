exports.install = function() {
	F.route('/', view_index);
};

// Read all users
function view_index() {

	var self = this;
    var User = MODEL('user').schema;

	User.find(function(err, users) {
		self.view('index', users);
	});

}