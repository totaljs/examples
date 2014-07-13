framework.on('controller', function(controller, name) {

	if (controller.url !== '/')
        return;

	// controllers/default.js - cancel execute function: viewIndex()
	controller.cancel();

	// redirect to new controller
    if (!controller.isTransfer)
	   controller.transfer('/cancel/');

    // or
    //controller.redirect('/cancel/');

});