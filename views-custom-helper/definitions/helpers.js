DEF.helpers.now = function() {
	// this === controller
	// current view model: this.model

	return new Date().format('dd.MM.yyyy HH:mm:ss');
};

DEF.helpers.say = function(what, raw) {
	// this === controller
	// current view model: this.model
	return raw ? what : what.toString().encode();
};