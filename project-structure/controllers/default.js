/**
 * @author Peter Širka
 * @version 1.0.1
 */

exports.install = function(framework) {
    framework.install('/', view_homepage);
};

/**
 * Homepage (GET)
 * @return {View}
 */
function view_homepage() {
    var self = this;

    /** @todo: NOT IMPLEMENTED **/
    self.view501();

}