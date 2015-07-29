F.on('controller', function(controller, name) {

	if (controller.url !== '/')
        return;

	// controllers/default.js - cancel the execution of the function: view_index()

    if (!controller.isTransfer) {
        controller.cancel();
    	controller.transfer('/cancel/');
    }

    // or
    // controller.cancel().redirect('/cancel/');

});