
F.on('controller', function(controller, name) {
	// set default value for each request to controller
	controller.repository.sitemap = [{ url: '/', name: 'Homepage' }];
	controller.layout('');
});