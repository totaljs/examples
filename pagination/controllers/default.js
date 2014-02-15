exports.install = function(framework) {
	framework.route('/', view_homepage);
};

function view_homepage() {
	var self = this;	
	
	var products = 1000;
	var page = 10;
	var perpage = 20;

	// Documentation: http://127.0.0.1:8001/Builders.Pagination/#Pagination
	var pagination = new builders.Pagination(products, page, perpage, '?page={0}');
	
	self.view('homepage', pagination);
}