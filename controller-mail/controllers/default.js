exports.install = function() {
	F.route('/', view_homepage);
	F.route('/mail/', redirect_mail);
};

function view_homepage() {
	this.view('homepage');
}

function redirect_mail() {

    // This function automatically reads view: email.html
    this.mail('petersirka@gmail.com', 'Test e-mail', '~email', { name: 'MODEL NAME' });
    this.redirect('/?success=1');

}