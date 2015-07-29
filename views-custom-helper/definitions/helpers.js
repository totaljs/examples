F.helpers.now = function() {
	// this === controller
	// current view model: this.model

	return new Date().format('dd.MM.yyyy HH:mm:ss');
};

F.helpers.say = function(what, raw) {

	// this === controller
	// current view model: this.model

	raw = raw || false;
	if (!raw)
		return what.toString().encode();
	return what;
};