// $ sudo npm install -g mongoose

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

global.mongoose = mongoose;