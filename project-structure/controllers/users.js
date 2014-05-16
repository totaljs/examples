/**
 * @author Peter Širka
 * @version 1.0.1
 */

exports.install = function(framework) {
    framework.install('/users/', view_list);
    framework.install('/users/{id}/', view_detail);
};

/**
 * Users (GET)
 * @return {View}
 */
function view_list() {

    var self = this;
    var users = MODULE('users');

    users.find({}, function(err, rows) {

        if (err) {
            self.view500(err);
            return;
        }

        /** @todo NOT IMPLEMENTED **/
        self.view501();

    });

}

/**
 * User detail (GET)
 * @param  {String} id User identificator.
 * @return {View}
 */
function view_detail(id) {

    var self = this;
    var users = MODULE('users');

    users.detail(id, function(err, row) {

        if (err) {
            self.view500(err);
            return;
        }

        if (row === null) {
            self.view404('User not found.');
            return;
        }

        /** @todo NOT IMPLEMENTED **/
        self.view501();

    });

}