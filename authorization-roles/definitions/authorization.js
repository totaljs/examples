// ================================================
// AUTHORIZATION
// ================================================

F.onAuthorize = function(req, res, flags, next) {

	var cookie = req.cookie('__user');

	switch (cookie) {
		case 'administrator':
		case 'moderator':
			flags.push('@' + cookie);
			next(true, { name: cookie });
			return;
	}

	next(false);
};