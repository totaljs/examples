// $ sudo npm install -g mongoose

var mongoose = require('mongoose');
mongoose.connect(CONFIG('database'));
global.mongoose = mongoose;