exports.install = function() {
	ROUTE('GET  /');
	ROUTE('POST /   *Contacts --> @save');
};