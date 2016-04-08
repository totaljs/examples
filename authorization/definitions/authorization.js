// ================================================
// AUTHORIZATION
// ================================================

F.onAuthorize = function(req, res, flags, callback) {

	var cookie = req.cookie(F.config.cookie);
	if (cookie === null || cookie.length < 10) {
		callback(false);
		return;
	}

	var obj = F.decrypt(cookie, 'user');

	if (obj === null || obj === '' || obj.ip !== req.ip) {
		callback(false);
		return;
	}

	var user = F.cache.read('user_' + obj.id);
	if (user !== null) {
		req.user = user;
		callback(true);
		return;
	}

	var db = F.database('users');

	// find the user in database
	db.one(n => n.id === obj.id, function(err, user) {

		if (user === null) {
			callback(false);
			return;
		}

		F.cache.add('user_' + user.id, user, new Date().add('m', 5));
		callback(true, user);
	});

};


F.onValidation = function(name, value) {
	switch (name) {
		case 'LoginName':
			return U.isEmail(value);
		case 'LoginPassword':
			return value.length > 0;
	};
}