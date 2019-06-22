exports.install = function() {
	ROUTE('/');
	RESIZE('/img/*.png', resizer);
};

function resizer(image) {
	image.resize('50%');
}