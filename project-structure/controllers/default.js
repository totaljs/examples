/**
 * @author Peter Širka
 * @version 1.0.1
 */

exports.install = function() {
    framework.install('/', view_index);
};

/**
 * Homepage (GET)
 * @return {View}
 */
function view_index() {
    var self = this;

    /** @todo: NOT IMPLEMENTED **/
    self.view501();

}