exports.install = function(framework) {
	framework.route('/', view_homepage);
	framework.route('/mail/', redirect_mail);
};

function view_homepage() {
	var self = this;
	self.view('homepage');
}

function redirect_mail() {

	var self = this;

    // This function automatically reads view: email.html
    self.mail('petersirka@gmail.com', 'Test e-mail', '~email', { name: 'MODEL NAME' });
    self.redirect('/?success=1');

}