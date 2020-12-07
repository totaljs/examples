function refresh() {

	// workers/weather.js will runs in other process
	var worker = WORKER('xml', 5000);

	// worker === http://nodejs.org/api/child_process.html#child_process_class_childprocess
	worker.on('message', function(obj) {
		MAIN.xml = obj;
	});
}

ONCE('load', refresh);
setInterval(refresh, 5000);