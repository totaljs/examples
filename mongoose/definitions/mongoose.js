// $ sudo npm install -g mongoose

var mongoose = require('mongoose');
<<<<<<< HEAD
mongoose.connect('mongodb://totaldemo:123456@ds029979.mongolab.com:29979/totaldemo');

=======
mongoose.connect(CONFIG('database'));
>>>>>>> origin/v1.7.0
global.mongoose = mongoose;