var counter = 0;
var planned = 0;

exports.install = function() {

	ROUTE('GET /', plain_index);

	// Planned scheduler:
	// Each day at 12:00
	SCHEDULE('12:00', '1 day', function() {
		planned++;
	});

	// Onetime at 12:00
	SCHEDULE('12:00', function() {
		planned++;
	});

	// Each 5 minutes and start at 12:00
	SCHEDULE('12:00', '5 minutes', function() {
		planned++;
	});

};

// This event is triggered every 60 seconds.
ON('service', function() {
	counter++;
});

function plain_index() {
	this.plain('Scheduler run counter: ' + counter + ', planned: ' + planned);
}