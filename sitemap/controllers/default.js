exports.install = function() {
	F.route('/', 'index');
	F.route('/contact/', 'contact');
	F.route('/terms/', 'terms');
	F.route('/terms/privacy/', 'privacy');
};