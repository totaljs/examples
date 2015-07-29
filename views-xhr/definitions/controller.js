// this code affects all controllers
F.on('controller', function(controller, name) {
	if (!controller.xhr)
		return;
	controller.layout('');
});