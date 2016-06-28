F.onAuthorize = function(req, res, flags, callback) {

	// http://localhost:8000/?user=admin
	// or
	// http://localhost:8000/?user=moderator

	if (req.query.user === 'admin' || req.query.user === 'moderator') {
		flags.push('@' + req.query.user);
		callback(true);
	} else
		callback(false);
};