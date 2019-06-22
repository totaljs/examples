exports.install = function() {
	ROUTE('GET  /');
	ROUTE('POST /api/send/  *ContactForms --> @save');
};
