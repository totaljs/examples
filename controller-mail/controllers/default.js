exports.install = function() {
	ROUTE('GEt /',      view_homepage);
	ROUTE('GEt /mail/', redirect_mail);
};

function view_homepage() {
	this.view('homepage');
}

function redirect_mail() {

	var self = this;

	// This function automatically reads view: email.html
	MAIL('petersirka@gmail.com', 'Test e-mail', '~email', { name: 'MODEL NAME' });

	self.redirect('/?success=1');
}