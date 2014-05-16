/**
 * @module users
 * @author Peter Širka
 * @version 1.0.1
 */

/**
 * Find users
 * @public
 * @param  {Object}   options  Custom filter.
 * @param  {Function} callback Callback.
 */
exports.find = function(options, callback) {

    var db = MODULE('database');

    if (!options.limit)
        options.limit = 50;

    db.find('users', options, callback);

}

/**
 * User detail
 * @public
 * @param  {String}   id       User identificator.
 * @param  {Function} callback Callback.
 */
exports.detail = function(id, callback) {

    var db = MODULE('database');
    var options = { id: id, limit: 1 };

    db.find('users', options, function(err, rows) {

        if (err) {
            callback(err);
            return;
        }

        callback(err, rows[0] || null);
    });
}