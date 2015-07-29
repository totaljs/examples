exports.install = function() {

	F.route('/', view_index);

	// [+xhr] - you can execute "view_subpage" with request type: XMLHttpRequest or classic GET/HTTP
	F.route('/sub/', view_subpage, ['+xhr']);

	F.route('/xhr/', xhr_example, ['xhr']);
	F.route('/xhr/post/', xhr_example, ['xhr', 'post']);

	F.route('/post/', form_example, ['post']);
	F.route('/json/', json_example, ['json']);
	F.route('/upload/', upload_example, ['upload']);

	F.route('/put/', put_example, ['put']);
	F.route('/delete/', delete_example, ['delete']);

	// This route is enabled in debug mode
	F.route('/debug/', debug_example, ['debug']);

	F.route('/myflag/', myflag_example, ['!myflag']);

	// https://github.com/petersirka/total.js/tree/master/examples/authorization
	// F.route('/user/profile/', user_profile, ['authorize']);
};

// flags: !myflag
function myflag_example() {

	var self = this;

	if (self.flags.indexOf('!myflag') !== -1) {
		self.plain('MYFLAG - homepage');
		return;
	}

	self.view404();
};

function view_index() {
	this.plain('GET - homepage');
}

// flags: +xhr
function view_subpage() {
	this.plain('SUBPAGE CONTENT');
}

// flags: post
function form_example() {
	this.plain('POST - homepage');
}

// flags: xhr
// Request header must contains XMLHttpRequest
function xhr_example() {
	this.plain('XHR - homepage');
}

// flags: json
// Request content must be a JSON
function json_example() {
	this.plain('JSON - homepage');
}

// flags: upload
// POST (MULTIPART)
function upload_example() {
	this.plain('UPLOAD - homepage');
}

// flags: debug
function debug_example() {
	this.plain('DEBUG MODE');
}

// flags: delete
function delete_example() {
	this.plain('DELETE - homepage');
}

// flags: put
function put_example() {
	this.plain('PUT - homepage');
}