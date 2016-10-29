exports.install = function() {
	F.route('/');
	F.resize('/img/*.png', resizer);
};

function resizer(image) {
	image.resize('50%');
}