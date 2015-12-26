var greeting = '';

exports.version = '1.01';

exports.install = function(options) {

    F.route('/feedback/', feedback);

    // INSTALL('view', 'feedback-view', 'http://www.some-url.com/some-view.html');

    // create client side JavaScript
    // F.fs.create.js('feedback.js', 'func' + 'tion feedback() { alert("I am feedback"); }');

    // create client side CSS
    // F.fs.create.css('feedback.css', 'feedback { padding:5px; font: normal 20px Arial; }');

    // create view file (must exists Views directory)
    // F.fs.create.view('feedback', '<div>VIEW</div>');

    // create resource (must exists Resources directory)
    // F.fs.create.resource('feedback', 'hello  : welcome in feedback resource');

    // get directory path
    // F.path.public('image.jpg');
    // F.path.logs();
    // F.path.temp();
    // F.path.backup();
    // F.path.root();

    /*

    F.on('load', function() {
        // all controllers and modules is loaded
    });

    F.on('controller', function(controller, name) {
        // every request to controller call this event
        console.log(controller.req.ip);
    });
    */

};

exports.uninstall = function(options) {

    // routes are removed automatically

    // remove files
    // F.fs.rm.css('feedback');
    // F.fs.rm.js('feedback');
    // F.fs.rm.view('feedback');
    // F.fs.rm.resource('feedback');

};

exports.greeting = function(value) {
    console.log('From greeting(): ' + value);
    greeting = value;
    return value;
};

function feedback() {
    this.plain('action in module: feedback.js');
}