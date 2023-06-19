exports.install = function() {
	ROUTE('GET /', index);
};

function index() {
	// https://docs.totaljs.com/total4/pzbr001pr41d/
	DATA.find('tbl_user').where('isremoved', false).take(10).callback(this.callback('index'));
}