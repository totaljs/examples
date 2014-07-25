var userSchema = mongoose.Schema({ alias: String, ip: String, email: String, password: String, created: Date });

exports.name = 'user';
exports.Schema = mongoose.model('User', userSchema);