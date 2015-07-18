var counter = 0;
var planned = 0;

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

	// Planned scheduler:
	// Each day at 12:00
	F.schedule('12:00', '1 day', function() {
		planned++;
	});

	// Onetime at 12:00
	F.schedule('12:00', function() {
		planned++;
	});

	// Each 5 minutes and start at 12:00
	F.schedule('12:00', '5 minutes', function() {
		planned++;
	});

};

function plain_index() {
	this.plain('Scheduler run counter: ' + counter + ', planned: ' + planned);
}