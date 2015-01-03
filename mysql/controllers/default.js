exports.install = function(framework) {
    framework.route('/', view_index);
};

function view_index() {

    var self = this;

    // definitions/mysql.js
    // create a DB connection
    DATABASE(function(err, connection){

        if(err != null) {
            self.throw500(err);
            return;
        }

        // Table schema = { Id: Number, Age: Number, Name: String };
        connection.query('SELECT * FROM users', function(err, rows) {

            // Close connection
            connection.release();

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