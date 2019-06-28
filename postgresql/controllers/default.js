exports.install = function() {
	ROUTE('/', view_homepage);
};

function view_homepage() {
	// https://wiki.totaljs.com/dbms/01-welcome/
	DBMS().find('tbl_user').where('isremoved', false).take(10).callback(this.callback('index'));
}