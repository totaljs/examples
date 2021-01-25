require('total4');

RESTBuilder.GET('http://www.w3schools.com/xml/cd_catalog.xml').stream(function(err, response) {
	response.stream.on('data', U.streamer('<CD>', '</CD>', function(value, index) {
		var xml = value.parseXML(true);
		xml.index = index;
		console.log(xml);
	}));
});