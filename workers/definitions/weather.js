function refresh() {
	// workers/weather.js will runs in other process
	var worker = F.worker('weather', 'current', 5000);

	// worker === http://nodejs.org/api/child_process.html#child_process_class_childprocess
	worker.on('message', function(obj) {
		// console.log(obj);
		framework.global.weather = obj;
	});
}

setInterval(refresh, 5000);
F.once('load', refresh);