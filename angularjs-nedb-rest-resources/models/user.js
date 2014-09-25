var userSchema = { alias: String, ip: String, email: String, password: String, created: Date };

exports.name = 'user';
exports.db = nedb.users;

//mongoose.model('User', userSchema);