var mongoose = require('mongoose');
mongoose.connect(F.config.database);

global.mongoose = mongoose;