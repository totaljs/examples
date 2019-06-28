exports.install = function() {
	ROUTE('/', view_index);
};

function view_index() {

	var self = this;

	// definitions/mysql.js
	// create a DB conn

	FUNC.mysql(function(err, conn) {

		if (err != null) {
			self.throw500(err);
			return;
		}

		// Table schema = { id: Number, age: Number, name: String };
		conn.query('SELECT * FROM users', function(err, rows) {

			// Close the connection
			conn.release();

			if (err != null) {
				self.view500(err);
				return;
			}

			// Shows the result on a console window
			console.log(rows);

			// Send rows as the model into the view
			self.view('index', rows);
		});

	});
}