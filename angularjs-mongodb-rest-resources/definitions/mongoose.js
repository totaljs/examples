var mongoose = require('mongoose');
mongoose.connect(framework.config.database);

global.mongoose = mongoose;