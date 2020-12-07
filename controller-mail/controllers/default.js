exports.install = function() {
	ROUTE('GET /',      view_homepage);
	ROUTE('GET /mail/', redirect_mail);
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