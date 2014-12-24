var mongoose = require('mongoose');
var userSchema = mongoose.Schema({ alias: String, created: Date })
module.exports = mongoose.model('user', userSchema);