exports.install = function() {
	F.route('/', view_homepage_cached);
	F.route('/notcached/', view_homepage);
	F.route('/fn/', view_fn_cached);
};

function view_homepage_cached() {

	var self = this;
	var key = 'my-cache-key';

	var item = F.cache.get(key);

	if (!item) {
		var date = new Date();
		item = date.toString();
		F.cache.add(key, item, '5 minutes');
	}

	// press 15x refresh browser
	self.plain(item);
}

function view_homepage() {
	var self = this;
	var	item = new Date().toString();

	// press 15x refresh browser
	self.plain(item);
}

function view_fn_cached() {

	var self = this;

	F.cache.fn('cache-name', function(fnSave) {

		var dt = new Date();

		// Documentation: http://docs.totaljs.com/FrameworkCache/#framework.cache.fn
		fnSave(dt.format('dd.MM.yyyy - HH:mm:ss'), '2 minutes');

	}, value => self.plain(value));
}