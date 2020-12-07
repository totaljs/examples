// THREAD contains a current thread name
// Empty THREAD means MAIN PROCESS
if (!THREAD) {
	ROUTE('GET /', function() {
		this.plain('Hello threads!');
	});
}