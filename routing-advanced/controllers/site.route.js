var site = require('./site/index');

exports.install = function (framework) {
    // sets the route
    framework.route('/', site.index);
};