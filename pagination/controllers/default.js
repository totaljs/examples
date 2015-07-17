exports.install = function() {
	F.route('/', view_index);
};

function view_index() {
	var self = this;

	var products = 1000;
	var page = (self.query.page || '10').parseInt();
	var perpage = 20;
	var pagination = new Builders.Pagination(products, page, perpage, '?page={0}');

	self.view('index', pagination);
}