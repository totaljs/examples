exports.install = function() {
	F.route('/', stop);
};

function stop() {
	// stop server
	F.stop();
}