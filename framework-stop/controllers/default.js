exports.install = function(framework) {
	framework.route('/', stop);
};

function stop() {
	// stop server
	framework.stop();
}