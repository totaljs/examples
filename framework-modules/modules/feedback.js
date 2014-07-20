var greeting = '';

exports.name = 'feedback';
exports.version = '1.01';

exports.install = function(framework, options) {

    framework.route('/feedback/', feedback);

    // INSTALL('view', 'feedback-view', 'http://www.some-url.com/some-view.html');

    // create client side JavaScript
    // framework.fs.create.js('feedback.js', 'func' + 'tion feedback() { alert("I am feedback"); }');

    // create client side CSS
    // framework.fs.create.css('feedback.css', 'feedback { padding:5px; font: normal 20px Arial; }');

    // create view file (must exists Views directory)
    // framework.fs.create.view('feedback', '<div>VIEW</div>');

    // create resource (must exists Resources directory)
    // framework.fs.create.resource('feedback', 'hello  : welcome in feedback resource');

    // get directory path
    // framework.path.public('image.jpg');
    // framework.path.logs();
    // framework.path.temp();
    // framework.path.backup();
    // framework.path.root();

    /*

    framework.on('load', function() {
        // all controllers and modules is loaded
    });

    framework.on('controller', function(controller, name) {
        // every request to controller call this event
        console.log(controller.req.ip);
    });
    */

};

exports.uninstall = function(framework, options) {

    // routes are removed automatically

    // remove files
    // framework.fs.rm.css('feedback');
    // framework.fs.rm.js('feedback');
    // framework.fs.rm.view('feedback');
    // framework.fs.rm.resource('feedback');

};

exports.greeting = function(value) {
    console.log('From greeting(): ' + value);
    greeting = value;
    return value;
};

function feedback() {
    this.plain('action in module: feedback.js');
}