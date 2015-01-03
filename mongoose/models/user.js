var mongoose = require('mongoose');
var userSchema = mongoose.Schema({ alias: String, created: Date })
exports.schema = mongoose.model('user', userSchema);
exports.name = 'user';