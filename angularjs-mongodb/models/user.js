var userSchema = mongoose.Schema({ alias: String, ip: String, email: String, password: String, created: Date });
module.exports = mongoose.model('User', userSchema);