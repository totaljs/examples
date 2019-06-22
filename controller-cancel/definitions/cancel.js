ON('controller', function(ctrl, name) {

	if (ctrl.url !== '/')
		return;

	// ctrls/default.js - cancel the execution of the function: view_index()

	if (!ctrl.isTransfer) {
		ctrl.cancel();
		ctrl.transfer('/cancel/');
	}

	// or
	// ctrl.cancel().redirect('/cancel/');

});