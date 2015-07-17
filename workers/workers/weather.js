require('total.js');

U.request('http://api.openweathermap.org/data/2.5/weather?q=London,uk', ['get'], function(err, data) {
	if (!err)
		process.send(JSON.parse(data));
	process.exit();
});