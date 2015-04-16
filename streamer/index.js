require('total.js');

U.download('http://www.w3schools.com/xml/cd_catalog.xml', ['get'], null, function(err, response) {
    response.on('data', U.streamer('</CD>', function(value, index) {
        if (index === 0)
            value = value.substring(value.indexOf('<CD'));
        var xml = value.parseXML();
        xml.index = index;
        console.log(xml);
    }));
});
