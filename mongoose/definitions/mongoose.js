// $ sudo npm install -g mongoose

var mongoose = require('mongoose');
mongoose.connect('mongodb://totaldemo:123456@ds029979.mongolab.com:29979/totaldemo');

global.mongoose = mongoose;