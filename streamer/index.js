require('total.js');

U.download('http://www.w3schools.com/xml/cd_catalog.xml', ['get'], null, function(err, response) {
    response.on('data', U.streamer('<CD>', '</CD>', function(value, index) {
        var xml = value.parseXML();
        xml.index = index;
        console.log(xml);
    }));
});
