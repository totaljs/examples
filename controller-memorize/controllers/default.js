exports.install = function() {
	F.route('/', view);
	F.route('/json/', json);
	F.route('/plain/', plain);
};

function view() {

	var self = this;
	self.repository.ticks = Date.now();

	// Save a rendered HTML into the cache (only the view - without layout, layout is not cached)
	// Memorize uses standard internal FrameworkCache
	self.memorize('view', '2 minutes', function() {
		// Here is cached output (without layout) + meta tags (title, description, keywords, image) + sitemap
		self.view('homepage', self.repository.ticks);
	});

	// OR

	/*
	self.memorize('view', '2 minutes',function() {
		console.log('view -> to cache');
		self.view('homepage', self.repository.ticks);
	}, function() {
		console.log('view -> from cache');
	});
	*/

	// OR

	/*
	self.memorize('view', '2 minutes', DEBUG, function() {
		CACHE WILL SKIPPED IN DEBUG MODE
		self.view('homepage', self.repository.ticks);
	});
	*/
}

function json() {

	var self = this;

	// Save a generated JSON into the cache
	// Memorize uses standard internal FrameworkCache
	self.memorize('json', '2 minutes', function() {
		self.json({ ticks: new Date().getTime() });
	});
}

function plain() {

	var self = this;

	// Save a output into the cache
	// Memorize uses standard internal FrameworkCache
	self.memorize('plain', '2 minutes', function() {
		self.plain('ticks: ' + new Date().getTime());
	});
}