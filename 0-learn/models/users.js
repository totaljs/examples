// Model name
exports.id = 'Users';
exports.version = '1.0';

var Address = NEWSCHEMA('Address');
Address.define('street', 'string(50)', true);
Address.define('city', 'string(50)', true);
Address.setValidation(on_validation);

var User = NEWSCHEMA('User');
User.define('_id', Object);
User.define('name', 'string(30)', true);
User.define('email', 'string(200)', true);
User.define('age', Number, true);
User.define('address', Address, true);
User.define('created', Date);
User.define('isremoved', Boolean);
User.setPrepare(on_prepare);
User.setDefault(on_default);
User.setValidation(on_validation);

User.setGet(function*(error, model, options, callback) {

    // options._id

    var db = DATABASE('users');
    var builder = new MongoBuilder();

    builder.where('_id', '=', options.id, true);
    builder.where('isremoved', false);

    var user = yield sync(builder.$$findOne(db))();
    if (user !== null) {
        U.copy(user, model); // copies "user" values to "model" (model is a default "User" instance)
        return callback(); // if you don't send any value into the callback then the framework uses "model"
    }

    error.push('error-user-404');
    callback();
});

User.setQuery(function(error, options, callback) {

    // options.page

    var db = DATABASE('users');
    var builder = new MongoBuilder();

    builder.where('isremoved', false);
    builder.page(options.page, 50); // 50 items per page

    builder.find(db).toArray(callback);
});

User.setSave(function(error, model, options, callback) {
    var db = DATABASE('users');
    var isUpdate = model._id ? true : false;
    var builder = new MongoBuilder();

    builder.set(model.$clean()); // .$clean() -–> removes built-in internal functions

    if (isUpdate) {
        builder.where('_id', '=', model._id, true); // true === auto-parsing ObjectID from the object
        builder.update(db, F.error()); // F.error() --> auto-error-handling
    } else{
        builder.set('_id', new ObjectID());
        builder.insert(db, F.error()) // F.error() --> auto-error-handling
    }

    callback(SUCCESS(true));
});

User.setRemove(function(error, options, callback) {

    // options.id

    var db = DATABASE('users');
    var builder = new MongoBuilder();

    builder.where('_id', '=', options.id, true); // true === auto-parsing ObjectID from the object
    builder.set('isremoved', true);
    builder.update(db, F.error()); // F.error() --> auto-error-handling

    callback(SUCCESS(true));
});

User.addWorkflow('check', function*(error, model, options, callback) {
    var builder = new MongoBuilder();

    builder.where('email', model.email);
    builder.where('isremoved', false);

    var user = yield sync(builder.$$one(DATABASE('users')))();
    if (!user)
        return callback(SUCCESS(true));

    error.push('error-user-exists');
    callback();
});

// Sets default values
function on_default(name) {
    switch (name) {
        case 'created':
            return new Date();
    }
}

// Prepares values
function on_prepare(name, value) {
    switch (name) {
        case 'email':
            return value.toLowerCase();
    }
}

// Validates values
function on_validation(name, value) {
    switch (name) {
        case 'name':
        case 'street':
        case 'city':
            return value.length > 0;
        case 'email':
            return value.isEmail();
        case age:
            // The value will be always Number (The framework compares types)
            return value > 18 && value < 60;
    }
}

exports.User = User;
exports.Address = Address;