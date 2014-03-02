var info = 'http://127.0.0.1:8000/?user=admin\nhttp://127.0.0.1:8000/?user=moderator';

exports.install = function(framework) {
	framework.route('#401', error_401);

	// custom flag definition : '!custom1', '!custom2'
	// role flag definition   : '@admin', '@moderator'
	// difference between custom and role flags is: custom flags are skipped from comparing flags between route and request

	framework.route('/', view_homepage);
	framework.route('/', view_admin, ['authorize', '@admin']);
	framework.route('/', view_moderator, ['authorize', '@moderator']);
};

function view_homepage() {
	this.plain(info);
}

// Flags: authorize, !admin
function view_admin() {
	this.plain('ADMIN');
}

// Flags: authorize, !moderator
function view_moderator() {
	this.plain('MODERATOR');
}

function error_401() {
	this.plain('401:UNAUTHORIZED\n\n' + info);
}