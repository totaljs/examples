// Load dependencies
var fs = require('fs');
var Utils = require('total.js/utils');

// Worker settings
var options = { path: '', hostname: '' };

process.on('message', function(data) {
    options = data;
    createXML();
});

function createXML() {

    var writer = fs.createWriteStream(options.path);

    var write = function(url, lastmod, priority, changefreq) {
        var str = '<url><loc>' + url.encode() + '</loc><lastmod>' + lastmod + '</lastmod><changefreq>' + changefreq + '</changefreq><priority>' + priority + '</priority></url>';
        writer.write(str);
    };

    var hostname = options.hostname;
    var lastmod = new Date().format('yyyy-MM-dd');

    writer.write('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.google.com/schemas/sitemap/0.84">', 'utf8');

    // Many items
    write(hostname + '/', lastmod, '1.0000', 'weekly');

    for (var i = 0; i < 1000; i++)
        write(hostname + '/products/' + i, lastmod, '0.3', 'monthly');

    // Complete
    writer.end('</urlset>');

    writer.on('finish', function() {
        // Done
        process.exit();
    });

}