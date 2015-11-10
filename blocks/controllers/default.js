exports.install = function() {
	F.route('/');
	F.route('/admin/', 'index');
};