// We want to initialize this definition file only for threads (not for main process)
if (THREAD) {
	// This script will be executed for each thread
	console.log('DATABASE READY FOR:', THREAD);

	FUNC.randomdata = function(type) {
		var arr = [];
		for (var i = 0; i < 10; i++)
			arr.push({ id: GUID(5), name: type + ' ' + (i + 1) });
		return arr;
	};
}