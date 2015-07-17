var counter = 0;

exports.install = function() {
	F.route('/', plain_index);

	// This event is triggered every 60 seconds.

	F.on('service', function() {
		counter++;
	});

	// or

	/*
	setInterval(function() {
		counter++;
	}, 1000);
	*/
};

function plain_index() {
	this.plain('Scheduler run counter: ' + counter);
}