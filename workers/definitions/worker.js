function refresh() {
	// workers/weather.js will runs in other process
	var worker = F.worker('xml', 'current', 5000);

	// worker === http://nodejs.org/api/child_process.html#child_process_class_childprocess
	worker.on('message', function(obj) {
		F.global.xml = obj;
	});
}

setInterval(refresh, 5000);
F.once('load', refresh);