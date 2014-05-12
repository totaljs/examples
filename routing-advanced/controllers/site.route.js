var site = require('./site/index');


/*
or 

var site = [
     require('./site/A'),
     require('./site/B'),
     require('./site/C'),
     require('./site/D'),
]


*/
exports.install = function (framework) {

    //Sets the controllers route
    framework.route('/', site.index);

};