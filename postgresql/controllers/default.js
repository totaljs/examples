exports.install = function() {
	F.route('/', view_homepage);
};

function view_homepage() {

	var self = this;

	// Documentation: https://github.com/petersirka/node-sqlagent
	var sql = DB();

	sql.select('users', 'tbl_user').make(function(builder) {
		builder.sort('name');
		builder.where('isremoved', false);
		builder.take(10);
	});

	sql.exec(function(err, response) {
		if (err)
			return self.throw500(err);
		self.view('index', response.users);
	});
}