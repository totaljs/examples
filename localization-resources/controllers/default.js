exports.install = function(framework) {
	framework.route('/', view_index);
	framework.route('/', json_index, ['xhr']);
};

// Sets the default language for all controllers
framework.on('controller', function(controller, name) {
	
	var language = controller.req.language;
	
	// Sets the language from the query string
	if (controller.query.language) {
		controller.language = controller.query.language;
		return;
	}

	controller.language = 'en';

	if (language.indexOf('sk') > -1)
		controller.language = 'sk';

	if (language.indexOf('cz') > -1)
		controller.language = 'cz';
});

function view_index() {
	var self = this;
	self.view('index');
}

function json_index(language) {
	var self = this;
	self.json({ message: RESOURCE(self.language, 'message') });
}