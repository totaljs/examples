// this code affects all controllers
ON('controller', function(controller) {
	if (controller.xhr)
		controller.layout('');
});