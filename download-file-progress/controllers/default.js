var fs = require('fs');
var progress = {};

exports.install = function(framework) {
	framework.route('/', view_homepage);
    framework.route('/', json_percentage, ['xhr']);
    framework.route('/download/', file_download);
};

/**
 * Homepage
 */
function view_homepage() {
    var self = this;
    self.view('homepage');
}

/**
 * Get download percentage
 */
function json_percentage() {
    var self = this;
    var id = (self.req.headers['user-agent'] + self.ip).hash('md5');
    self.json({ percentage: progress[id] || 0 });
}

/**
 * Download larger file
 */
function file_download() {

    var self = this;
    var filename = self.path.public('file.zip');
    var stream = fs.createReadStream(filename);

    var size = fs.statSync(filename).size;
    var current = 0;
    var percentage = 0;
    var id = (self.req.headers['user-agent'] + self.ip).hash('md5');

    progress[id] = 0;

    stream.on('data', function(buffer) {
        current += buffer.length;
        progress[id] = Math.floor((current / size) * 100);
    });

    self.stream(utils.getContentType('.zip'), stream, 'file.zip');

}
